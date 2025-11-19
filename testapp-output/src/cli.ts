import { Command } from 'commander';
import { AppHandler } from './interfaces.js';

export function setupCLI(handler: AppHandler) {
  const program = new Command();
  
  program
    .name('testapp')
    .description('これはテストapp')
    .version('0.0.1');

  program.argument('<env>', 'Target environment');
  program.option('-v, --verbose ', 'Verbose output');
  program.action(async (env, options) => {
    if (!env) {
      console.error('❌ Error: Required argument "env" is missing');
      console.error('\nUsage: testapp <env>');
      process.exit(1);
    }
    const params = {
      env: env,
      verbose: options.verbose,
    };
    await handler.testhandler(params);
  });
  return program;
}
