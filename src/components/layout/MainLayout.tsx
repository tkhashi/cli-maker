import React from 'react';

interface MainLayoutProps {
  sidebar: React.ReactNode;
  editor: React.ReactNode;
  preview: React.ReactNode;
}

export function MainLayout({ sidebar, editor, preview }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-gray-900">
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
        {sidebar}
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {editor}
      </main>
      <aside className="w-96 flex-shrink-0 border-l border-gray-200 bg-gray-50 overflow-y-auto">
        {preview}
      </aside>
    </div>
  );
}
