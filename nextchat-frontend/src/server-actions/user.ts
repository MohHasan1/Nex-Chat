"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectMongoDB } from "@/config/db-config";
import user from "@/models/user-model";
import UserType from "@/types/user-type";
import { cloneOrSerialize } from "@/utils/cloneOrSerialize";
import { logInfo } from "@/utils/log";
import { currentUser, User } from "@clerk/nextjs/server";

connectMongoDB();

export const checkOrCreateUserInMongo = async () => {
  try {
    // Get the current user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { error: "No user found in Clerk" };
    }

    // Check if the user exists in MongoDB
    const mongoUser = await user.findOne({ clerkUserId: clerkUser.id });
    if (mongoUser) return true;

    // Else create a new user
    await CreateNewUserInMongo(clerkUser);
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const GetCurrentUserFromMongo = async () => {
  try {
    // Get the current user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { error: "No user found in Clerk" };
    }

    // Check if the user exists in MongoDB
    const mongoUser: UserType | null = await user.findOne({
      clerkUserId: clerkUser.id,
    });
    if (mongoUser) return cloneOrSerialize(mongoUser);
    return { error: "User not found" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const UpdateCurrentUserInMongo = async () => {
  try {
    // Get the current user from Clerk - updated //
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { error: "Error getting Updated user from Clerk" };
    }

    // Extract the primary email from Clerk user
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      return { error: "Primary email not found in Clerk user data" };
    }

    // Update or create the user in MongoDB
    const updatedUser: UserType | null = await user.findOneAndUpdate(
      { clerkUserId: clerkUser.id }, // Locate user by Clerk ID
      {
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        username: clerkUser.username,
        email: primaryEmail,
        profilePictureUrl: clerkUser.imageUrl,
      }
    );

    logInfo("user is updated")
    if (updatedUser) return cloneOrSerialize(updatedUser);
  } catch (error: any) {
    return { error: error.message };
  }
};

export const CreateNewUserInMongo = async (clerkUser: User) => {
  try {
    // Check if the user exists in MongoDB
    const mongoUser: UserType | null = await user.findOne({
      clerkUserId: clerkUser.id,
    });
    if (mongoUser) return cloneOrSerialize(mongoUser);

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
    const newUser: UserType = await user.create(newUserPayload);

    // Return the new user as a plain object
    return cloneOrSerialize(newUser);
  } catch (error: any) {
    return { error: error.message };
  }
};

export const GetAllUsersFromMongo = async () => {
  try {
    const users: UserType[] = await user.find({});
    return users.map((user) => cloneOrSerialize(user));
  } catch (error: any) {
    return { error: error.message };
  }
};

// You need .lean(), serialization, or JSON.parse(JSON.stringify()) depending on the use case:

// .lean():
// - Returns plain JavaScript objects instead of Mongoose documents.
// - Use when you don't need Mongoose methods like .save() or .populate().
// - Faster for read-only operations.

// Serialization:
// - Converts MongoDB-specific types (e.g., ObjectId → string, Date → ISO string).
// - Needed for compatibility with JSON-based APIs or client-side props in frameworks like Next.js.

// JSON.parse(JSON.stringify()):
// - Quick way to serialize and strip non-JSON-compatible fields.
// - Use for small datasets, but not ideal for performance-critical or complex custom handling.

// Choose based on whether you need simplicity (parse+stringify), speed (lean), or control (custom serialization).
