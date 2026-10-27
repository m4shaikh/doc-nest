'use server'


import { InputFile } from "node-appwrite/file";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, OrderBy, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { stringify } from "querystring";

interface uploadFileProps {
    file: File;
    ownerId: string;
    ownerName: string;
    accountId: string;
    path: string;
}

interface renameFileProps {
    name: string;
    fileId: string;
    extension: string;
    path: string;
}

export const uploadFile = async ({ file, ownerId, accountId, path, ownerName }: uploadFileProps) => {
    const { storage, databases } = await createAdminClient()

    try {

        const inputFile = InputFile.fromBuffer(file, file.name)
        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile)

        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            extension: getFileType(bucketFile.name).extension,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            ownerName: ownerName,
            accountId: accountId,
            users: [],
            bucketFileId: bucketFile.$id
        }
        const newFile = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.fileTableId,
            ID.unique(),
            fileDocument
        ).catch(async (error: unknown) => {
            await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id)
            revalidatePath(path)
        })
        return parseStringify(newFile)
    } catch (error) {
        console.log('Error', error)
    }
}

const createQueries = (currentUser: any, type: string, searchText: string, sort: string) => {
    const queries = [
        Query.or([
            Query.equal('owner', [currentUser.$id]),
            Query.contains('users', [currentUser.email]),
        ])
    ]
    
    if (type) {
        queries.push(Query.equal('type', [type]))
    }
    
    if (searchText) {
        queries.push(Query.contains('name', searchText))
    }

    const sortString = sort || '$createdAt-desc'
    const [sortBy, orderBy] = sortString.split('-')
    
    queries.push(orderBy === 'asc' ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy))

    return queries
}

export const getFiles = async (type: string='', searchText:string, sort:string = '$createdAt-desc') => {

    const { databases } = await createAdminClient()


    try {

        const currentUser = await getCurrentUser()
        if (!currentUser) throw new Error('No user')
        const queries = createQueries(currentUser, type, searchText, sort)
        const files = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.fileTableId,
            queries,
        )
        return parseStringify(files)
    } catch (error) {
        console.log(error)
    }
}

export const renameFile = async ({ name, fileId, extension, path }: renameFileProps) => {
    const { databases } = await createAdminClient()
    
    const newName = `${name}.${extension}`
    const updatedFile = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.fileTableId,
        fileId,
        {
            name: newName
        }
    )
    revalidatePath(path)
    return parseStringify(updatedFile)
}

export const deleteFile = async (fileId: string, bucketFileId: string, path:string) => {
    const { databases, storage } = await createAdminClient()

    const deletedFile = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.fileTableId,
        fileId
    )
    if (deletedFile) {

        await storage.deleteFile(
            appwriteConfig.bucketId,
            bucketFileId
        )

    }
    revalidatePath(path)
    return parseStringify(deletedFile)
}

export const shareFile = async (emails:string[], fileId:string, path:string) => {
    const {databases} = await createAdminClient()
    
    const sharedFile = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.fileTableId,
        fileId,
        {
            users : emails
        }
    )
    revalidatePath(path)
    return ''
}
export async function getTotalSpaceUsed() {
  try {
    const { databases } = await createAdminClient();
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User is not authenticated.");

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      [
        Query.equal("owner", [currentUser.$id]),
        Query.select(["size", "type", "$updatedAt"]),
        Query.limit(5000),
      ]
    );

    const totalSpace = {
      image: { size: 0, latestDate: "" },
      document: { size: 0, latestDate: "" },
      video: { size: 0, latestDate: "" },
      audio: { size: 0, latestDate: "" },
      other: { size: 0, latestDate: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024, // 2GB quota in bytes
    };

    files.documents.forEach((file) => {
      const fileType = file.type as "image" | "document" | "video" | "audio" | "other";
      const fileSize = Number(file.size) || 0;

      if (totalSpace[fileType]) {
        totalSpace[fileType].size += fileSize;

        if (
          !totalSpace[fileType].latestDate ||
          new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
        ) {
          totalSpace[fileType].latestDate = file.$updatedAt;
        }
      }

      totalSpace.used += fileSize;
    });

    return parseStringify(totalSpace);
  } catch (error) {
    console.error("Error calculating total space:", error);
    return null;
  }
}

// Inside lib/actions/file.actions.ts
export async function getRecentFiles(limit = 10) {
  try {
    const { databases } = await createAdminClient();
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error("User is not authenticated.");

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.fileTableId,
      [
        Query.or([
          Query.equal("owner", [currentUser.$id]),
          Query.contains("users", [currentUser.email]),
        ]),
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
      ]
    );

    return parseStringify(files);
  } catch (error) {
    console.error("Error fetching recent files:", error);
    return { documents: [], total: 0 };
  }
}