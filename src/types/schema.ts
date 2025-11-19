export type DataType = 'string' | 'number' | 'boolean';

export interface Parameter {
  id: string;
  name: string;
  kind: 'argument' | 'option';
  type: DataType;
  required: boolean;
  description?: string;
  shortAlias?: string;
}

export interface Command {
  id: string;
  name: string;
  description?: string;
  parentId: string | null;
  parameters: Parameter[];
  handlerName: string;
  subcommands: string[]; // IDs of subcommands
}
