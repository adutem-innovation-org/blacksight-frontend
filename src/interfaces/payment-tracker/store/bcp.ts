import { PaymentInterval } from "@/enums";
import { UserData } from "@/interfaces/auth";

export interface IBCP {
  _id: string;
  userId: string;
  uploadedBy?: Pick<UserData, "firstName" | "lastName" | "email">;
  fileId: string;
  name: string;
  email: string;
  phone?: string;
  paymentInterval: PaymentInterval;
  lastPayment: Date;
  nextPayment: Date;
  createdAt: Date;
  updatedAt: Date;
}
