import { BotStatus } from "@/enums";

export type Bot = {
  _id: string;
  businessId: string;
  knowledgeBaseId: string;
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
