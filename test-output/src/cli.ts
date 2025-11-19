import { Command } from 'commander';
import { AppHandler } from './interfaces.js';

export function setupCLI(handler: AppHandler) {
  const program = new Command();
  
  program
    .name('myapp')
    .description('Test CLI application')
    .version('0.0.1');

  program.action(async (options) => {
    const params = {
    };
    await handler.main(params);
  });
  const cmd_deploy_cmd = program.command('deploy <environment>');
  cmd_deploy_cmd.description('Deploy the application');
  cmd_deploy_cmd.option('-v, --verbose ', 'Verbose output');
  cmd_deploy_cmd.action(async (environment, options) => {
    const params = {
      environment: environment,
      verbose: options.verbose,
    };
    await handler.handleDeploy(params);
  });

  return program;
}
