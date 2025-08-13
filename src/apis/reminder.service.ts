import {
  CreateScheduledReminderBody,
  CreateReminderBody,
  CreateReminderRes,
  DeleteReminderRes,
  GetRemindersRes,
  NewReminderAnalyticsRes,
  ReminderAnalyticsRes,
  SendInstantReminderBody,
  UpdateReminderBody,
  UpdateReminderRes,
  UpdateReminderStatusRes,
  CancelReminderRes,
} from "@/interfaces";
import { ApiService } from "./api.service";
import { REMINDER_URLS } from "./endpoints";

export class ReminderApiService {
  private static instance: ReminderApiService;
  private readonly apiService: ApiService;

  private readonly urls: typeof REMINDER_URLS = REMINDER_URLS;

  constructor() {
    this.apiService = new ApiService("reminder");
  }

  static getInstance(): ReminderApiService {
    if (!this.instance) {
      this.instance = new ReminderApiService();
    }
    return this.instance;
  }

  getReminderAnalytics = () => {
    return this.apiService.get<NewReminderAnalyticsRes>(
      this.urls.REMINDER_ANALYTICS
    );
  };

  getReminders = () => {
    return this.apiService.get<GetRemindersRes>(this.urls.GET_ALL_REMINDERS);
  };

  createReminder = (data: CreateReminderBody) => {
    return this.apiService.postWithFile<CreateReminderBody, CreateReminderRes>(
      this.urls.CREATE_REMINDER,
      data
    );
  };

  updateReminder = (id: string, data: UpdateReminderBody) => {
    return this.apiService.updateWithFile<
      UpdateReminderBody,
      UpdateReminderRes
    >(`${this.urls.UPDATE_REMINDER}/${id}`, data);
  };

  resumeReminder = (id: string) => {
    return this.apiService.update<any, UpdateReminderStatusRes>(
      `${this.urls.RESUME_REMINDER}/${id}`
    );
  };

  pauseReminder = (id: string) => {
    return this.apiService.update<any, UpdateReminderStatusRes>(
      `${this.urls.PAUSE_REMINDER}/${id}`
    );
  };

  cancelReminder = (id: string) => {
    return this.apiService.update<any, CancelReminderRes>(
      `${this.urls.CANCEL_REMINDER}/${id}`
    );
  };

  deleteReminder = (id: string) => {
    return this.apiService.delete<DeleteReminderRes>(
      `${this.urls.DELETE_REMINDER}/${id}`
    );
  };

  sendInstantReminder = (data: SendInstantReminderBody) => {
    return this.apiService.post<SendInstantReminderBody, CreateReminderRes>(
      this.urls.SEND_INSTANT_REMINDER,
      data
    );
  };

  createScheduledReminder = (data: CreateScheduledReminderBody) => {
    return this.apiService.post<CreateScheduledReminderBody, CreateReminderRes>(
      this.urls.CREATE_SCHEDULED_REMINDER,
      data
    );
  };

  sendInstantBCPReminder = (data: SendInstantReminderBody) => {
    return this.apiService.post<SendInstantReminderBody, CreateReminderRes>(
      this.urls.SEND_INSTANT_BCP_REMINDER,
      data
    );
  };

  createScheduledBCPReminder = (data: CreateScheduledReminderBody) => {
    return this.apiService.post<CreateScheduledReminderBody, CreateReminderRes>(
      this.urls.CREATE_SCHEDULED_BCP_REMINDER,
      data
    );
  };
}
