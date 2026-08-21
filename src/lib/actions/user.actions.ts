"use server";

import { Query, ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

//User enters name and email
//Check if user already exists
//Send otp to that email
//This will create secret key
//If new user create user
//Return user id
//Verify OTP

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.userTableId,
    queries: [Query.equal("email", [email])],
  });

  return result.total > 0 ? result.rows[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Faild to send OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({ email });

  if (!accountId) throw new Error("Failed to send an OTP");
  if (!existingUser) {
    const { databases } = await createAdminClient();
    await databases.createRow(
      appwriteConfig.databaseId,
      appwriteConfig.userTableId, 
      ID.unique(),
      {
        fullName,
        email,
        accountId,
      },
    );
  }

  return parseStringify({ accountId });
};

export const verifyOTP = async ({
  accountId,
  password
}: {
  accountId: string;
  password: string;
}) => {
  try {

    const {account} = await createAdminClient()

    const session = await account.createSession(accountId,password);
    
    (await cookies()).set("appwrite-session",session.secret,{
      path:'/',
      httpOnly:true,
      sameSite:"strict",
      secure:true
    })

    return parseStringify({sessionId:session.$id})

  } catch (error) { 
    handleError(error,'Failed to verify OTP')
  }
};
