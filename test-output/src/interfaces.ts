import * as Types from './types.js';

export interface AppHandler {
  main(params: Types.MyappParams): Promise<void>;
  handleDeploy(params: Types.DeployParams): Promise<void>;
}
