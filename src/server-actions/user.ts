"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectMongoDB } from "@/config/db-config";
import user from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  try {
    // Ensure MongoDB is connected
    await connectMongoDB();

    // Get the current user from Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return { error: "No user found in Clerk" };
    }

    // Check if the user exists in MongoDB
    const mongoUser = await user.findOne({ clerkUserId: clerkUser.id }).lean();

    // If user exists, return the MongoDB user object
    if (mongoUser) return mongoUser;

    // If the user does not exist in MongoDB, create a new user
    const newUserPayload = {
      clerkUserId: clerkUser.id,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      username: clerkUser.username,
      email: clerkUser.emailAddresses?.[0]?.emailAddress || null,
      profilePictureUrl: clerkUser.imageUrl,
    };

    // Create the new user in the database
    const newUser = await user.create(newUserPayload);

    // Return the new user as a plain object
    return newUser.toObject();
  } catch (error: any) {
    return { error: error.message };
  }
};
