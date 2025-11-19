import { Command } from 'commander';
import { AppHandler } from './interfaces.js';

export function setupCLI(handler: AppHandler) {
  const program = new Command();
  
  program
    .name('testapp2')
    .description('Test app 2')
    .version('0.0.1');

  program.argument('<ra>', 'Root argument');
  const cmd_first_subcmd = program.command('first-subcmd');
  cmd_first_subcmd.description('サブコマンド1');
  cmd_first_subcmd.argument('<subargstr>', '必須サブコマンドstr');
  cmd_first_subcmd.option('-sab, --subargbool ', 'デフォルトtrue');
  cmd_first_subcmd.action(async (subargstr, options) => {
    if (!subargstr) {
      console.error('❌ Error: Required argument "subargstr" is missing');
      console.error('\nUsage: first-subcmd <subargstr>');
      process.exit(1);
    }
    const params = {
      subargstr: subargstr,
      subargbool: options.subargbool,
    };
    await handler.firstSubCmd(params);
  });

  const cmd_second_subcmd = program.command('second-subcmd');
  cmd_second_subcmd.description('サブコマンド2');
  cmd_second_subcmd.action(async (options) => {
    const params = {
    };
    await handler.secondSubCmd(params);
  });

  return program;
}
