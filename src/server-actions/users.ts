"use server";

import { currentUser } from "@clerk/nextjs/server";
import UserModel from "@/models/user-model";
import { connectMongoDB } from "@/config/db-config";

await connectMongoDB();
export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();

    const user = await UserModel.findOne({ clerkUserId: clerkUser?.id });
    // if the user is found, return the user
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }
    // if the user is not found, create a new user and return the user
    const userObj = {
      username:
        clerkUser?.username || clerkUser?.firstName + " " + clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0].emailAddress,
      clerkUserId: clerkUser?.id,
      profilePicture: clerkUser?.imageUrl,
      isActive: true,
      isAdmin: false,
    };

    const newUser = await UserModel.create(userObj);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  }
};
