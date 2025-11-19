import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, Plus, Trash2, Command as CommandIcon } from 'lucide-react';

interface CommandNodeProps {
  commandId: string;
  depth?: number;
}

const CommandNode: React.FC<CommandNodeProps> = ({ commandId, depth = 0 }) => {
  const command = useAppStore((state) => state.commands[commandId]);
  const selectedCommandId = useAppStore((state) => state.selectedCommandId);
  const setSelectedCommandId = useAppStore((state) => state.setSelectedCommandId);
  const addCommand = useAppStore((state) => state.addCommand);
  const deleteCommand = useAppStore((state) => state.deleteCommand);
  
  const [isExpanded, setIsExpanded] = React.useState(true);

  if (!command) return null;

  const isSelected = selectedCommandId === commandId;
  const hasChildren = command.subcommands.length > 0;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCommandId(commandId);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleAddSubcommand = (e: React.MouseEvent) => {
    e.stopPropagation();
    addCommand(commandId, {
      name: 'new-command',
      description: 'New Subcommand',
      handlerName: 'newHandler',
      parameters: [],
      parentId: commandId,
    });
    setIsExpanded(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this command?')) {
      deleteCommand(commandId);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex items-center py-1 px-2 cursor-pointer hover:bg-gray-100 rounded-md group',
          isSelected && 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleSelect}
      >
        <button
          onClick={handleToggle}
          className={cn(
            'p-0.5 rounded hover:bg-gray-200 mr-1',
            !hasChildren && 'invisible'
          )}
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </button>
        
        <CommandIcon className="w-4 h-4 mr-2 opacity-70" />
        <span className="text-sm font-medium truncate flex-1">{command.name}</span>

        <div className="hidden group-hover:flex items-center space-x-1 ml-2">
          <button
            onClick={handleAddSubcommand}
            className="p-1 hover:bg-gray-200 rounded"
            title="Add Subcommand"
          >
            <Plus className="w-3 h-3" />
          </button>
          {command.parentId && (
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-100 text-red-500 rounded"
              title="Delete Command"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="mt-0.5">
          {command.subcommands.map((childId) => (
            <CommandNode key={childId} commandId={childId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function CommandTree() {
  const rootCommandId = useAppStore((state) => state.rootCommandId);

  return (
    <div className="p-2">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
        Commands
      </h2>
      <CommandNode commandId={rootCommandId} />
    </div>
  );
}
