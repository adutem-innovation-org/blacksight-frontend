import {
  DeletePaymentFileRes,
  GetAllPaymentFilesRes,
  UploadPaymentFileBody,
  UploadPaymentFileRes,
  GetPaymentFileBCPsRes,
  DeleteBCPRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { PAYMENT_TRACKER_URLS } from "./endpoints";

export class PaymentTrackerApiService {
  private static instance: PaymentTrackerApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof PAYMENT_TRACKER_URLS = PAYMENT_TRACKER_URLS;

  constructor() {
    this.apiService = new ApiService("payment-tracker");
  }

  static getInstance() {
    if (!PaymentTrackerApiService.instance) {
      PaymentTrackerApiService.instance = new PaymentTrackerApiService();
    }
    return PaymentTrackerApiService.instance;
  }

  uploadPaymentFile = (data: UploadPaymentFileBody) => {
    return this.apiService.postWithFile<
      UploadPaymentFileBody,
      UploadPaymentFileRes
    >(this.urls.UPLOAD_PAYMENT_FILE, data);
  };

  getAllPaymentFiles = () => {
    return this.apiService.get<GetAllPaymentFilesRes>(
      this.urls.GET_ALL_PAYMENT_FILES
    );
  };

  deletePaymentFile = (id: string) => {
    return this.apiService.delete<DeletePaymentFileRes>(
      `${this.urls.DELETE_PAYMENT_FILE}/${id}`
    );
  };

  getPaymentFileBCPs = (fileId: string) => {
    return this.apiService.get<GetPaymentFileBCPsRes>(
      `${this.urls.GET_PAYMENT_FILE_BCPS.replace(":fileId", fileId)}`
    );
  };

  deleteBCP = (id: string) => {
    return this.apiService.delete<DeleteBCPRes>(
      `${this.urls.DELETE_BCP}/${id}`
    );
  };
}
