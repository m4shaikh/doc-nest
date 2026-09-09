import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value))
}

export function getFileType(fileName: string) {
  if (!fileName || typeof fileName !== 'string') {
    return { extension: null, type: 'unknown' };
  }

  const lastDotIndex = fileName.lastIndexOf('.');

  // Handle files with no extension or hidden files with no trailing extension (e.g., ".env")
  if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === fileName.length - 1) {
    return { extension: null, type: 'unknown' };
  }

  const extension = fileName.slice(lastDotIndex + 1).toLowerCase();

  // Dictionary mapping broad categories to specific extensions
  const typeMap = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'],
    video: ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm'],
    audio: ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'],
    document: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'rtf', 'md'],
    archive: ['zip', 'rar', 'tar', 'gz', '7z', 'bz2'],
    code: ['js', 'ts', 'html', 'css', 'json', 'xml', 'py', 'java', 'cpp', 'c', 'sh']
  };

  let fileType = 'unknown';

  for (const [type, extensions] of Object.entries(typeMap)) {
    if (extensions.includes(extension)) {
      fileType = type;
      break;
    }
  }

  return { extension, type: fileType };
}