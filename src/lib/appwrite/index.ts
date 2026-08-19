'use server'
import { Account, Avatars, Client, Databases, Storage, TablesDB } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers"
import { error } from "console"

export const createSessionClient = async () =>{
    const client = new Client()
    .setEndpoint(appwriteConfig.endpoinurl)
    .setProject(appwriteConfig.projectId)

    const session = (await cookies()).get('appwrite-session')
    const AllCookies = await cookies()

    console.log(AllCookies)
    
    if (!session || !session.value) throw new Error('No Session');

    client.setSession(session.value);

    return{
        get account(){
            return new Account(client)
        },
        get databases(){
            return new Databases(client)
        }
    }
}

export const createAdminClient = async () => {
    const client = new Client()
    .setEndpoint(appwriteConfig.endpoinurl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey)

    return{
        get account(){
            return new Account(client)
        },
        get databases(){
            return new TablesDB(client)
        },
        get storage(){
            return new Storage(client)
        },
        get avatar(){
            return new Avatars(client)
        }
    }
}