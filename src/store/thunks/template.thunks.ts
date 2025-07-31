import { TemplateService } from "@/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateTemplateBody,
  CreateTemplateRes,
  GetTemplatesRes,
} from "@/interfaces";
import { UserTypes } from "@/enums";

const templateApiService = TemplateService.getInstance();

export const getTemplateAnalytics = createAsyncThunk<
  Record<string, number>,
  void,
  { rejectValue: { message: string } }
>("get_template_analytics", async (_: void, { rejectWithValue }) => {
  try {
    const data = await templateApiService.getTemplateAnalytics();
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createTemplate = createAsyncThunk<
  CreateTemplateRes["template"],
  CreateTemplateBody,
  {
    rejectValue: { errors?: Record<string, string>; message: string };
  }
>("create_template", async (data: CreateTemplateBody, { rejectWithValue }) => {
  try {
    const resp = await templateApiService.createTemplate(data);
    return resp.template;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const getPaginatedTemplates = createAsyncThunk<
  GetTemplatesRes,
  UserTypes,
  { rejectValue: { message: string } }
>("get_paginated_templates", async (userType, { rejectWithValue }) => {
  try {
    const request =
      userType === UserTypes.USER
        ? templateApiService.getUserTemplates
        : templateApiService.getAdminTemplates;
    const res = await request();
    return res;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
