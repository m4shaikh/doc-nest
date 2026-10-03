'use server'

import { InputFile } from "node-appwrite/file";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
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

export const getFiles = async (type: string) => {
    const { databases } = await createAdminClient()

    const createQueries = (currentUser: any) => {

        const queries = [Query.or([
            Query.equal('owner', [currentUser.$id]),
            Query.contains('users', [currentUser.email]),
        ])]

        const isType = Query.equal('type', [type])

        return queries
    }

    try {
        const currentUser = await getCurrentUser()
        if (!currentUser) throw new Error('No user')
        const queries = createQueries(currentUser)
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