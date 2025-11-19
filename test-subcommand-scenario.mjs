// Test script for user's subcommand scenario
import { generateCode } from './src/lib/generator/index.js';
import * as fs from 'fs';
import * as path from 'path';

// Create command structure matching user's screenshot
const commands = {
  root: {
    id: 'root',
    name: 'testapp2',
    description: 'Test app 2',
    parentId: null,
    parameters: [
      {
        id: 'ra-arg',
        name: 'ra',
        kind: 'argument',
        type: 'string',
        required: true,
        description: 'Root argument'
      }
    ],
    handlerName: 'mainHandler',
    subcommands: ['first-subcmd', 'second-subcmd']
  },
  'first-subcmd': {
    id: 'first-subcmd',
    name: 'first-subcmd',
    description: 'サブコマンド1',
    parentId: 'root',
    parameters: [
      {
        id: 'subargstr',
        name: 'subargstr',
        kind: 'argument',
        type: 'string',
        required: true,
        description: '必須サブコマンドstr'
      },
      {
        id: 'subargbool',
        name: 'subargbool',
        kind: 'option',
        type: 'boolean',
        required: false,
        description: 'デフォルトtrue',
        shortAlias: 'sab'
      }
    ],
    handlerName: 'firstSubCmd',
    subcommands: []
  },
  'second-subcmd': {
    id: 'second-subcmd',
    name: 'second-subcmd',
    description: 'サブコマンド2',
    parentId: 'root',
    parameters: [],
    handlerName: 'secondSubCmd',
    subcommands: []
  }
};

// Generate files
const files = generateCode(commands, 'root');

// Create output directory
const outputDir = '/tmp/testapp2-cli';
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// Write all files
files.forEach(file => {
  const filePath = path.join(outputDir, file.path);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, file.content, 'utf-8');
  console.log(`✓ Created ${file.path}`);
});

console.log(`\n✅ Generated ${files.length} files in ${outputDir}`);
console.log('\nTest commands:');
console.log('  # Should error - missing subcommand argument');
console.log('  npm run dev -- rootvalue first-subcmd');
console.log('');
console.log('  # Should work');
console.log('  npm run dev -- rootvalue first-subcmd subargvalue');
