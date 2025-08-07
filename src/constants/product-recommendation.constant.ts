import { KnowledgeBaseSources } from "@/enums";
import { KBSourceType } from "./knowledge-base.constant";
import { IProductsSource } from "@/interfaces";
import { v4 as uuidv4 } from "uuid";

export const productSourcesWidgetData: KBSourceType[] = [
  {
    source: KnowledgeBaseSources.FILE,
    label: "Upload File",
    iconClass: "fi fi-rr-file-upload",
    description:
      "Import data from Excel, CSV, or text files. Great for uploading product, package, or subscription details.",
  },
  {
    source: KnowledgeBaseSources.TEXT_INPUT,
    label: "Enter Text",
    iconClass: "fi fi-rr-text",
    description:
      "Manually add product, package, or service information by writing or pasting text.",
  },
  {
    source: KnowledgeBaseSources.API,
    label: "Connect API",
    iconClass: "fi fi-rr-plug-connection",
    description:
      "Securely link your product API. We'll fetch and analyze offerings like plans, packages, or items for recommendations.",
  },
];

// export const productSourceData: IProductsSource[] = [
//   {
//     _id: uuidv4(),
//     source: KnowledgeBaseSources.FILE,
//     tag: "Product Data File 1",
//     createdBy: { email: "blacksightai@gmail.com" },
//     updatedAt: new Date("2024-08-05T00:00:00.000Z"),
//     metaData: {
//       name: "Product Data File 1.xlsx",
//       size: "2.5 kB",
//     },
//   },
//   {
//     _id: uuidv4(),
//     source: KnowledgeBaseSources.TEXT_INPUT,
//     tag: "Blacksight Subscription Plan",
//     createdBy: { email: "blacksightai@gmail.com" },
//     updatedAt: new Date("2024-07-21T00:00:00.000Z"),
//     metaData: {
//       name: "Blacksight Subscription Plan",
//       size: "4.6 kB",
//     },
//   },
//   {
//     _id: uuidv4(),
//     source: KnowledgeBaseSources.API,
//     tag: "Blacksight Clothing Collection",
//     createdBy: { email: "blacksightai@gmail.com" },
//     updatedAt: new Date("2024-08-01T00:00:00.000Z"),
//     metaData: {
//       name: "Blacksight Clothing Collection",
//       url: "https://api.blacksight.com/clothing-collection/",
//       updateInterval: "Daily",
//     },
//   },
//   {
//     _id: uuidv4(),
//     source: KnowledgeBaseSources.TEXT_INPUT,
//     tag: "Blacksight Products File",
//     createdBy: { email: "blacksightai@gmail.com" },
//     updatedAt: new Date("2024-05-05T00:00:00.000Z"),
//     metaData: {
//       name: "Blacksight Product File",
//       size: "4.6 kB",
//     },
//   },
// ];
