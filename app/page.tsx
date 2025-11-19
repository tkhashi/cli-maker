'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { CommandTree } from '@/components/sidebar/CommandTree';
import { CommandEditor } from '@/components/editor/CommandEditor';
import { CodePreview } from '@/components/preview/CodePreview';

export default function Home() {
  return (
    <MainLayout
      sidebar={<CommandTree />}
      editor={<CommandEditor />}
      preview={<CodePreview />}
    />
  );
}

