

type ChatType = {
  _id: string;
  users: string[];
  createdBy: string;
  lastMessage?: string;
  chatImgUrl?: string;
  isGroupChat: boolean;
  groupName?: string;
  groupBio: string;
  groupAdmins?: string[];
  unReadCounts: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
};

export default ChatType;
