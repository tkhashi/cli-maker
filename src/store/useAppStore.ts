import { create } from 'zustand';
import { Command, Parameter } from '@/types/schema';

interface AppState {
  commands: Record<string, Command>;
  rootCommandId: string;
  selectedCommandId: string | null;

  // Actions
  setSelectedCommandId: (id: string | null) => void;
  addCommand: (parentId: string | null, command: Omit<Command, 'id' | 'subcommands'>) => void;
  updateCommand: (id: string, data: Partial<Command>) => void;
  deleteCommand: (id: string) => void;

  addParameter: (commandId: string, param: Omit<Parameter, 'id'>) => void;
  updateParameter: (commandId: string, paramId: string, data: Partial<Parameter>) => void;
  deleteParameter: (commandId: string, paramId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  commands: {
    root: {
      id: 'root',
      name: 'app',
      description: 'Root command',
      parentId: null,
      parameters: [],
      handlerName: 'main',
      subcommands: [],
    },
  },
  rootCommandId: 'root',
  selectedCommandId: 'root',

  setSelectedCommandId: (id) => set({ selectedCommandId: id }),

  addCommand: (parentId, commandData) =>
    set((state) => {
      const id = crypto.randomUUID();
      const newCommand: Command = {
        ...commandData,
        id,
        subcommands: [],
        parentId,
      };

      const newCommands = { ...state.commands, [id]: newCommand };

      if (parentId && newCommands[parentId]) {
        newCommands[parentId] = {
          ...newCommands[parentId],
          subcommands: [...newCommands[parentId].subcommands, id],
        };
      }

      return { commands: newCommands };
    }),

  updateCommand: (id, data) =>
    set((state) => {
      const command = state.commands[id];
      if (!command) return {};

      const updatedCommand = { ...command, ...data };
      return { commands: { ...state.commands, [id]: updatedCommand } };
    }),

  deleteCommand: (id) =>
    set((state) => {
      if (id === state.rootCommandId) return {};

      const command = state.commands[id];
      if (!command) return {};

      const newCommands = { ...state.commands };
      delete newCommands[id];

      // Remove from parent
      if (command.parentId && newCommands[command.parentId]) {
        const parent = newCommands[command.parentId];
        newCommands[command.parentId] = {
          ...parent,
          subcommands: parent.subcommands.filter((childId) => childId !== id),
        };
      }
      
      // Recursive delete (optional for PoC but good to have)
      const deleteRecursive = (cmdId: string) => {
          const cmd = state.commands[cmdId];
          if(cmd) {
              cmd.subcommands.forEach(deleteRecursive);
              delete newCommands[cmdId];
          }
      }
      // We already deleted the target, but we should delete its children
      command.subcommands.forEach(deleteRecursive);

      return { commands: newCommands };
    }),

  addParameter: (commandId, paramData) =>
    set((state) => {
      const command = state.commands[commandId];
      if (!command) return {};

      const id = crypto.randomUUID();
      const newParam: Parameter = { ...paramData, id };

      const updatedCommand = {
        ...command,
        parameters: [...command.parameters, newParam],
      };

      return { commands: { ...state.commands, [commandId]: updatedCommand } };
    }),

  updateParameter: (commandId, paramId, data) =>
    set((state) => {
      const command = state.commands[commandId];
      if (!command) return {};

      const updatedParams = command.parameters.map((p) =>
        p.id === paramId ? { ...p, ...data } : p
      );

      const updatedCommand = { ...command, parameters: updatedParams };
      return { commands: { ...state.commands, [commandId]: updatedCommand } };
    }),

  deleteParameter: (commandId, paramId) =>
    set((state) => {
      const command = state.commands[commandId];
      if (!command) return {};

      const updatedParams = command.parameters.filter((p) => p.id !== paramId);
      const updatedCommand = { ...command, parameters: updatedParams };
      return { commands: { ...state.commands, [commandId]: updatedCommand } };
    }),
}));
