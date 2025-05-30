import {
  CreateReminderBody,
  CreateReminderRes,
  DeleteReminderRes,
  GetRemindersRes,
  ReminderAnalyticsRes,
  UpdateReminderBody,
  UpdateReminderRes,
  UpdateReminderStatusRes,
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
    return this.apiService.get<ReminderAnalyticsRes>(
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

  activateReminder = (id: string) => {
    return this.apiService.update<any, UpdateReminderStatusRes>(
      `${this.urls.ACTIVATE_REMINDER}/${id}`
    );
  };

  deactivateReminder = (id: string) => {
    return this.apiService.update<any, UpdateReminderStatusRes>(
      `${this.urls.DEACTIVATE_REMINDER}/${id}`
    );
  };

  deleteReminder = (id: string) => {
    return this.apiService.delete<DeleteReminderRes>(
      `${this.urls.DELETE_REMINDER}/${id}`
    );
  };
}
