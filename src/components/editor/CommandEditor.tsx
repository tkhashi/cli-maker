import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useAppStore } from '@/store/useAppStore';
import { Command, Parameter } from '@/types/schema';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormData = {
  name: string;
  description: string;
  handlerName: string;
  parameters: Parameter[];
};

export function CommandEditor() {
  const selectedCommandId = useAppStore((state) => state.selectedCommandId);
  const commands = useAppStore((state) => state.commands);
  const updateCommand = useAppStore((state) => state.updateCommand);

  const command = selectedCommandId ? commands[selectedCommandId] : null;

  const { register, control, handleSubmit, reset, watch, setValue } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      handlerName: '',
      parameters: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parameters',
  });

  // Reset form when selected command changes
  useEffect(() => {
    if (command) {
      reset({
        name: command.name,
        description: command.description || '',
        handlerName: command.handlerName,
        parameters: command.parameters,
      });
    }
  }, [command, reset]);

  // Auto-save on change (debounced or on blur would be better, but simple effect for PoC)
  // For PoC, let's use a "Save" button or just blur.
  // Actually, let's use onBlur for inputs to trigger update.
  // Or just watch everything and update.
  
  const onSubmit = (data: FormData) => {
    if (selectedCommandId) {
        // We need to be careful not to overwrite ID or subcommands
        // The form data matches the partial command structure we want to update
        updateCommand(selectedCommandId, {
            name: data.name,
            description: data.description,
            handlerName: data.handlerName,
            parameters: data.parameters
        });
    }
  };

  if (!command) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a command to edit
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-medium text-gray-900">Edit Command</h2>
      </div>
      
      <form className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name')}
                onBlur={handleSubmit(onSubmit)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Handler Name</label>
              <input
                {...register('handlerName')}
                onBlur={handleSubmit(onSubmit)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                {...register('description')}
                onBlur={handleSubmit(onSubmit)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Parameters</h3>
            <button
              type="button"
              onClick={() => append({
                  id: crypto.randomUUID(),
                  name: 'newParam',
                  kind: 'option',
                  type: 'string',
                  required: false,
                  description: '',
                  shortAlias: ''
              })}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Parameter
            </button>
          </div>
          
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="grid grid-cols-12 gap-2 flex-1">
                    {/* Name */}
                    <div className="col-span-3">
                        <input
                            {...register(`parameters.${index}.name`)}
                            onBlur={handleSubmit(onSubmit)}
                            placeholder="Name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-xs border p-1"
                        />
                    </div>
                    {/* Kind */}
                    <div className="col-span-2">
                        <select
                            {...register(`parameters.${index}.kind`)}
                            onChange={(e) => {
                              setValue(`parameters.${index}.kind`, e.target.value as 'argument' | 'option');
                              handleSubmit(onSubmit)();
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-xs border p-1"
                        >
                            <option value="argument">Argument</option>
                            <option value="option">Option</option>
                        </select>
                    </div>
                    {/* Type */}
                    <div className="col-span-2">
                        <select
                            {...register(`parameters.${index}.type`)}
                            onChange={(e) => {
                              setValue(`parameters.${index}.type`, e.target.value as 'string' | 'number' | 'boolean');
                              handleSubmit(onSubmit)();
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-xs border p-1"
                        >
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                        </select>
                    </div>
                    {/* Required */}
                    <div className="col-span-1 flex items-center justify-center pt-2">
                        <label className="flex items-center space-x-1">
                            <input
                                type="checkbox"
                                {...register(`parameters.${index}.required`)}
                                onChange={(e) => {
                                  setValue(`parameters.${index}.required`, e.target.checked);
                                  handleSubmit(onSubmit)();
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                            />
                            <span className="text-xs text-gray-500">Req</span>
                        </label>
                    </div>
                     {/* Alias (Option only) */}
                     <div className="col-span-1">
                        <input
                            {...register(`parameters.${index}.shortAlias`)}
                            onBlur={handleSubmit(onSubmit)}
                            placeholder="-a"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-xs border p-1"
                        />
                    </div>
                     {/* Desc */}
                     <div className="col-span-3">
                        <input
                            {...register(`parameters.${index}.description`)}
                            onBlur={handleSubmit(onSubmit)}
                            placeholder="Description"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-xs border p-1"
                        />
                    </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {fields.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No parameters defined.</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
