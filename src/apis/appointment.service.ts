import {
  AppointmentAnalyticsRes,
  GetAppointmentsRes,
  UpdateAppointmentStatusBody,
  UpdateAppointmentStatusRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { APPOINTMENT_URLS } from "./endpoints";

export class AppointmentApiService {
  private static instance: AppointmentApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof APPOINTMENT_URLS = APPOINTMENT_URLS;

  constructor() {
    this.apiService = new ApiService("appointment");
  }

  static getInstance(): AppointmentApiService {
    if (!this.instance) {
      this.instance = new AppointmentApiService();
    }
    return this.instance;
  }

  getAppointmentAnalytics = () => {
    return this.apiService.get<AppointmentAnalyticsRes>(
      this.urls.APPOINTMENT_ANALYTICS
    );
  };

  getAppointments = () => {
    return this.apiService.get<GetAppointmentsRes>(
      this.urls.GET_ALL_APPOINTMENTS
    );
  };

  updateAppointmentStatus = (id: string, data: UpdateAppointmentStatusBody) => {
    return this.apiService.update<
      UpdateAppointmentStatusBody,
      UpdateAppointmentStatusRes
    >(this.urls.UPDATE_APPOINTMENT_STATUS.replace(":id", id), data);
  };

  deleteAppointment = (id: string) => {
    return this.apiService.delete<UpdateAppointmentStatusRes>(
      this.urls.DELETE_APPOINTMENT.replace(":id", id)
    );
  };
}
