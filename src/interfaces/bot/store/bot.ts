import { BotStatus, RoleEnum } from "@/enums";

export type Bot = {
  _id: string;
  businessId: string;
  knowledgeBaseIds: string[];
  scheduleMeeting: boolean;
  welcomeMessage: string;
  meetingProviderId: string;
  name: string;
  instructions: string;
  status: BotStatus;
  isActive: boolean;
  knowledgeBase: {
    tag: string;
    isActive: boolean;
  };
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  role: RoleEnum;
  content: string;
};

export type Conversation = {
  botId: string;
  businessId: string;
  conversationId: string;
  duration: string;
  messages: Message[];
};
