import { UserData } from "@/interfaces/auth";

export interface IPaymentFile {
  _id: string;
  userId: string;
  uploadedBy?: Pick<UserData, "firstName" | "lastName" | "email">;
  tag: string; // Tag can also be file name
  fileUrl: string; // Firebase Storage URL
  createdAt: Date;
  updatedAt: Date;
  metaData: Record<string, string>; // Metadata such as file name, type, and size.
}
