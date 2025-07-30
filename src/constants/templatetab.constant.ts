import { TemplateCategory } from "@/enums";

export const APPOINTMENT_TEMPLATE_DYNAMIC_FIELDS = [
  "customerEmail",
  "customerName",
  "customerPhone",
  "appointmentDate",
  "appointmentTime",
];

export const PAYMENT_TEMPLATE_DYNAMIC_FIELDS = [
  "customerName",
  "customerEmail",
  "amount",
  "plan",
  "lastPayment",
  "nextPayment",
];

export const saveTemplateSectionFields: Record<string, string[]> = {
  0: ["name", "description"],
  1: ["category", "dynamicFields", "keywords"],
};

export const templateCategoryDynamicFieldMap = {
  [TemplateCategory.APPOINTMENT]: [
    {
      value: "customerEmail",
      label: "Customer Email {{customerEmail}}",
    },
    {
      value: "customerName",
      label: "Customer Name {{customerName}}",
    },
    {
      value: "customerPhone",
      label: "Customer Phone {{customerPhone}}",
    },
    {
      value: "appointmentDate",
      label: "Appointment Date {{appointmentDate}}",
    },
    {
      value: "appointmentTime",
      label: "Appointment Time {{appointmentTime}}",
    },
  ],
  [TemplateCategory.PAYMENT]: [
    {
      value: "customerName",
      label: "Customer Name {{customerName}}",
    },
    {
      value: "customerEmail",
      label: "Customer Email {{customerEmail}}",
    },
    {
      value: "amount",
      label: "Amount {{amount}}",
    },
    {
      value: "plan",
      label: "Plan {{plan}}",
    },
    {
      value: "lastPayment",
      label: "Last Payment {{lastPayment}}",
    },
    {
      value: "nextPayment",
      label: "Next Payment {{nextPayment}}",
    },
  ],
};

export const templateKeywords = [
  "Technology",
  "UI/UX",
  "Programming",
  "Web design",
  "Web development",
  "Graphics Design",
  "Brand design",
  "Photography",
  "Videography",
  "Copywriting",
  "Writing",
  "Content creation",
  "Email marketing",
  "Marketing",
  "Affiliate Marketing",
];
