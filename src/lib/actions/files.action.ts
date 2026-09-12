'use server'

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { size } from "zod";
import { error } from "console";
import { revalidatePath } from "next/cache";

interface uploadFileProps {
    file:File;
    ownerId:string;
    accountId:string;
    path:string;
}

export const uploadFile = async({file,ownerId,accountId,path}:uploadFileProps) => {
    const {storage, databases} = await createAdminClient()
    try {
    
        const inputFile = InputFile.fromBuffer(file,file.name)
        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(),inputFile)
        
        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            extension: getFileType(bucketFile.name).extension,
            name:bucketFile.name,
            url:constructFileUrl(bucketFile.$id),
            size: bucketFile.sizeOriginal,
            owner:ownerId,
            accountId:accountId,
            users:[],
            bucketFileId : bucketFile.$id
        }
        const newFile = await databases.createRow(
            appwriteConfig.databaseId,
            appwriteConfig.fileTableId,
            ID.unique(),
            fileDocument
        ).catch(async(error:unknown)=>{
            await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id)
            revalidatePath(path)
        })
        return parseStringify(newFile)
    } catch (error) {
        console.log('Error',error)
    }
}