import { createSecretKey } from "node:crypto";

export const appwriteConfig ={
    endpoinurl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId:process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    bucketId:process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    userTableId:process.env.NEXT_PUBLIC_APPWRITE_USER_TABLE_ID!,
    fileTableId:process.env.NEXT_PUBLIC_APPWRITE_FILE_TABLE_ID!,
    secretKey:process.env.NEXT_APPWRITE_KEY!,
}

