export interface Subscription {
  id: string;
  subscriptionId: string;
  subscriptionType: "Refund" | "Payment";
  amount: number;
  status: string;
  clientName: string;
  clientEmail: string;
  invoiceId: string;
  subscriptionDate: string;
  paymentMethod: "QR Code" | "Bank Transfer";
  clientId: string;
  clientIpAddress: string;
  description?: string;
}
