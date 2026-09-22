import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type FileType = 'document' | 'image' | 'video' | 'audio' | 'other';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value))
}

export const getFileType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (!extension) return { type: 'other', extension: '' };

  const documentExtensions = [
    'pdf',
    'doc',
    'docx',
    'txt',
    'xls',
    'xlsx',
    'csv',
    'rtf',
    'ods',
    'ppt',
    'odp',
    'md',
    'html',
    'htm',
    'epub',
    'pages',
    'fig',
    'psd',
    'ai',
    'indd',
    'xd',
    'sketch',
    'afdesign',
    'afphoto',
    'afphoto',
  ];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac'];

  if (documentExtensions.includes(extension))
    return { type: 'document', extension };
  if (imageExtensions.includes(extension)) return { type: 'image', extension };
  if (videoExtensions.includes(extension)) return { type: 'video', extension };
  if (audioExtensions.includes(extension)) return { type: 'audio', extension };

  return { type: 'other', extension };
};


export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string,
) => {
  switch (extension) {
    // Document
    case 'pdf':
      return '/assets/icons/file-pdf.svg';
    case 'doc':
      return '/assets/icons/file-doc.svg';
    case 'docx':
      return '/assets/icons/file-docx.svg';
    case 'csv':
      return '/assets/icons/file-csv.svg';
    case 'txt':
      return '/assets/icons/file-txt.svg';
    case 'xls':
    case 'xlsx':
      return '/assets/icons/file-document.svg';
    // Image
    case 'svg':
      return '/assets/icons/file-image.svg';
    // Video
    case 'mkv':
    case 'mov':
    case 'avi':
    case 'wmv':
    case 'mp4':
    case 'flv':
    case 'webm':
    case 'm4v':
    case '3gp':
      return '/assets/icons/file-video.svg';
    // Audio
    case 'mp3':
    case 'mpeg':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'ogg':
    case 'wma':
    case 'm4a':
    case 'aiff':
    case 'alac':
      return '/assets/icons/file-audio.svg';

    default:
      switch (type) {
        case 'image':
          return '/assets/icons/file-image.svg';
        case 'document':
          return '/assets/icons/file-document.svg';
        case 'video':
          return '/assets/icons/file-video.svg';
        case 'audio':
          return '/assets/icons/file-audio.svg';
        default:
          return '/assets/icons/file-other.svg';
      }
  }
};

export const getFileSize = (size:number) =>{
  if(size>1024 && size< 1048576){
    size = size/1024
    return `${size.toFixed(1)}KB`
  }
  if(size>1048576){
    size = (size/1048576)
    return `${size.toFixed(1)}MB`
  }else{
    return `${size}B`
  }
} 
export const parseDateTime = (dateString: string) => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return null;
  }

  return {
    date, // Original Date object if needed
    year: date.getFullYear(), // e.g. 2026
    month: date.getMonth() + 1, // 1-12
    monthNameShort: date.toLocaleString('en-US', { month: 'short' }), // "Sep"
    monthNameLong: date.toLocaleString('en-US', { month: 'long' }), // "September"
    day: date.getDate(), // 1-31
    dayOfWeek: date.toLocaleString('en-US', { weekday: 'short' }), // "Wed"
    hour: date.getHours(), // 0-23 (24-hour)
    hour12: date.getHours() % 12 || 12, // 1-12 (12-hour)
    minute: String(date.getMinutes()).padStart(2, '0'), // "33" (padded)
    second: String(date.getSeconds()).padStart(2, '0'), // "51" (padded)
    ampm: date.getHours() >= 12 ? 'PM' : 'AM',
  };
};