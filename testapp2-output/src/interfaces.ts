import * as Types from './types.js';

export interface AppHandler {
  mainHandler(params: Types.Testapp2Params): Promise<void>;
  firstSubCmd(params: Types.FirstSubcmdParams): Promise<void>;
  secondSubCmd(params: Types.SecondSubcmdParams): Promise<void>;
}
