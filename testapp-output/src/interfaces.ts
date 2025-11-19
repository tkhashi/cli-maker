import * as Types from './types.js';

export interface AppHandler {
  testhandler(params: Types.TestappParams): Promise<void>;
}
