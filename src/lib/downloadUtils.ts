/**
 * Utility functions for downloading generated CLI projects
 */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type GeneratedFile = {
  path: string;
  content: string;
};

/**
 * Creates a ZIP archive from generated files
 */
export async function createProjectZip(
  files: GeneratedFile[],
  projectName: string
): Promise<Blob> {
  const zip = new JSZip();

  // Add all files to the ZIP
  files.forEach((file) => {
    zip.file(file.path, file.content);
  });

  // Generate the ZIP blob
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9
    }
  });

  return blob;
}

/**
 * Triggers a browser download of the ZIP file
 */
export function downloadZip(blob: Blob, filename: string): void {
  saveAs(blob, filename);
}

/**
 * Formats a timestamp for use in filenames
 */
export function formatTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

/**
 * Downloads the generated CLI project as a ZIP file
 */
export async function downloadProject(
  files: GeneratedFile[],
  projectName: string
): Promise<void> {
  const timestamp = formatTimestamp();
  const filename = `${projectName}-${timestamp}.zip`;
  
  const blob = await createProjectZip(files, projectName);
  downloadZip(blob, filename);
}
