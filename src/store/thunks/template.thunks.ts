import { TemplateService } from "@/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateTemplateBody,
  CreateTemplateRes,
  DeleteTemplateRes,
  GetTemplatesRes,
  UpdateTemplateBody,
  UpdateTemplateRes,
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
>("create_template", async (data, { rejectWithValue }) => {
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

export const updateTemplate = createAsyncThunk<
  UpdateTemplateRes["template"],
  { data: UpdateTemplateBody; id: string },
  {
    rejectValue: { errors?: Record<string, string>; message: string };
  }
>("update_template", async ({ id, data }, { rejectWithValue }) => {
  try {
    const resp = await templateApiService.updateTemplate(id, data);
    return resp.template;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deleteTemplate = createAsyncThunk<
  DeleteTemplateRes["template"],
  string,
  {
    rejectValue: { message: string };
  }
>("delete_template", async (id, { rejectWithValue }) => {
  try {
    const resp = await templateApiService.deleteTemplate(id);
    return resp.template;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
