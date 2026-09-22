export type FormType = 'Login'|'Signup'

type SegmentParams = Record<string, string>;

export interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}