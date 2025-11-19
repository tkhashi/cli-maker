import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { generateCode } from '@/lib/generator';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CodePreview() {
  const commands = useAppStore((state) => state.commands);
  const rootCommandId = useAppStore((state) => state.rootCommandId);
  
  const [activeTab, setActiveTab] = useState('src/cli.ts');
  const [copied, setCopied] = useState(false);

  const generatedFiles = useMemo(() => {
    return generateCode(commands, rootCommandId);
  }, [commands, rootCommandId]);

  const activeFile = generatedFiles.find((f) => f.path === activeTab);

  const handleCopy = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-1 overflow-x-auto">
          {generatedFiles.map((file) => (
            <button
              key={file.path}
              onClick={() => setActiveTab(file.path)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors',
                activeTab === file.path
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              )}
            >
              {file.path.replace('src/', '')}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 text-gray-400 hover:text-white rounded transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        <pre className="whitespace-pre-wrap break-all">
          {activeFile?.content || '// No content'}
        </pre>
      </div>
    </div>
  );
}
