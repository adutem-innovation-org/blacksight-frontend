export enum BotStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum BotTabsEnum {
  PLAYGROUND = "playground",
  ANALYTICS = "analytics",
}

export enum RoleEnum {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
  DEVELOPER = "developer",
}

export enum BotActions {
  BOOK_APPOINTMENT = "BOOK_APPOINTMENT",
  ESCALATE_CHAT = "ESCALATE_CHAT",
}

export enum UserActions {
  CLOSE_APPOINTMENT_FORM = "CLOSE_APPOINTMENT_FORM",
  COMPLETE_APPOINTMENT_FORM = "COMPLETE_APPOINTMENT_FORM",
  CLOSE_ESCALATION_FORM = "CLOSE_ESCALATION_FORM",
  COMPLETE_ESCALATION_FORM = "COMPLETE_ESCALATION_FORM",
}
