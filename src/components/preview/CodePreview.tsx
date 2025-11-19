import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { generateCode } from '@/lib/generator';
import { downloadProject } from '@/lib/downloadUtils';
import { Copy, Check, Download, FileText, FileJson, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CodePreview() {
  const commands = useAppStore((state) => state.commands);
  const rootCommandId = useAppStore((state) => state.rootCommandId);
  
  const [activeTab, setActiveTab] = useState('src/cli.ts');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const generatedFiles = useMemo(() => {
    return generateCode(commands, rootCommandId);
  }, [commands, rootCommandId]);

  const activeFile = generatedFiles.find((f) => f.path === activeTab);
  const rootCommand = commands[rootCommandId];

  const handleCopy = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const projectName = rootCommand?.name || 'generated-cli';
      await downloadProject(generatedFiles, projectName);
    } catch (error) {
      console.error('Failed to download project:', error);
      alert('Failed to download project. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const getFileIcon = (path: string) => {
    if (path.endsWith('.json')) return <FileJson className="w-3 h-3" />;
    if (path.endsWith('.md')) return <FileText className="w-3 h-3" />;
    return <FileCode className="w-3 h-3" />;
  };

  const getFileName = (path: string) => {
    // Show full path for better clarity
    return path;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-1 overflow-x-auto flex-1 mr-4">
          {generatedFiles.map((file) => (
            <button
              key={file.path}
              onClick={() => setActiveTab(file.path)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors whitespace-nowrap flex items-center gap-1.5',
                activeTab === file.path
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              )}
            >
              {getFileIcon(file.path)}
              {getFileName(file.path)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-white rounded transition-colors"
            title="Copy current file to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-sm font-medium',
              downloading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            )}
            title="Download project as ZIP"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download Project'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        <pre className="whitespace-pre-wrap break-all">
          {activeFile?.content || '// No content'}
        </pre>
      </div>
    </div>
  );
}
