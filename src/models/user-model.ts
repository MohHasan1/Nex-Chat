import { deleteModel, model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      default: null,
    },
    profilePictureUrl: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Check if the model is already defined, if not, define it
if (models && models["User"]) deleteModel("User")
  const user = model("User", userSchema);
// const user = models.User || model("User", userSchema);

export default user;
