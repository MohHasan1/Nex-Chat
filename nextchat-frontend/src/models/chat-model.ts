// chat contains bunch of messages //
import ChatType from "@/types/chat-type";
import { deleteModel, model, models, Schema } from "mongoose";

const chatSchema = new Schema(
  {
    users: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    chatImgUrl: {
      type: String,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
    },
    groupBio: {
      type: String,
      default: "Welcome to the group!",
    },
    groupAdmins: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    unReadCounts: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

if (models && models["Chat"]) deleteModel("Chat");
const chat = model<ChatType>("Chat", chatSchema);
// const chat = models.Chat || model("Chat", chatSchema);

export default chat;
