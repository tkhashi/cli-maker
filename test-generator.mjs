// Quick test script to generate CLI files and verify they work
import { generateCode } from './src/lib/generator/index.js';
import * as fs from 'fs';
import * as path from 'path';

// Create a simple test command structure
const commands = {
  root: {
    id: 'root',
    name: 'myapp',
    description: 'Test CLI application',
    parentId: null,
    parameters: [],
    handlerName: 'main',
    subcommands: ['deploy-cmd']
  },
  'deploy-cmd': {
    id: 'deploy-cmd',
    name: 'deploy',
    description: 'Deploy the application',
    parentId: 'root',
    parameters: [
      {
        id: 'env-arg',
        name: 'environment',
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
    handlerName: 'handleDeploy',
    subcommands: []
  }
};

// Generate files
const files = generateCode(commands, 'root');

// Create output directory
const outputDir = '/tmp/test-cli-project';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

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
console.log('  npm run dev -- deploy production --verbose');
