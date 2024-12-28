// Message is a text a user sends //
import MessageType from "@/types/message-type";
import { model, models, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      default: null,
      required: true,
    },
    image: {
      type: String,
    },
    readBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const message = models.Message || model<MessageType>("Message", messageSchema);

export default message;
