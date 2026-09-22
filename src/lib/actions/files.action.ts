'use server'

import { InputFile } from "node-appwrite/file";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

interface uploadFileProps {
    file: File;
    ownerId: string;
    ownerName: string;
    accountId: string;
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

        const isType = Query.equal('type',[type])

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
        console.log(files)
        return parseStringify(files)
    } catch (error) {
        console.log(error)
    }
}