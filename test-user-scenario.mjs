// Test script for user's scenario: testapp with required env argument
import { generateCode } from './src/lib/generator/index.js';
import * as fs from 'fs';
import * as path from 'path';

// Create command structure matching user's screenshot
const commands = {
  root: {
    id: 'root',
    name: 'testapp',
    description: 'これはテストapp',
    parentId: null,
    parameters: [
      {
        id: 'env-arg',
        name: 'env',
        kind: 'argument',
        type: 'string',
        required: true,
        description: 'Target environment'
      },
      {
        id: 'verbose-opt',
        name: 'verbose',
        kind: 'option',
        type: 'boolean',
        required: false,
        description: 'Verbose output',
        shortAlias: 'v'
      }
    ],
    handlerName: 'testhandler',
    subcommands: []
  }
};

// Generate files
const files = generateCode(commands, 'root');

// Create output directory
const outputDir = '/tmp/testapp-cli';
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
console.log('\nNext steps:');
console.log(`  cd ${outputDir}`);
console.log('  npm install');
console.log('  npm run dev -- testapp production --verbose');
console.log('  npm run dev -- testapp  # Should show error for missing env');
