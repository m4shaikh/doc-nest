export type FormType = 'Login' | 'Signup'

export interface SearchParamProps {
  params?: Promise<Record<string, string>>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface File {
  collectionId:string;
  $createdAt:string;
  $databaseId : string;
  $id:string;
  $permissions:[]
  $sequence:string
  $updatedAt:string;
  accountId:string;
  bucketFileId:string; 
  extension:string;
  name:string;
  owner:string;
  ownerName:string | null;
  size:number;
  type:string;
  url:string;
  users:string[]
}