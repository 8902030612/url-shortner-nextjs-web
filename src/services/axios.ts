import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export type Params = {
  url: string;
  customSlug?: string;
};

export type ServerError = {
  message: string;
  error: string;
  statusCode: number;
};
export type ApiResponse = {
  message: string;
  ShortId: string;
  ShortUrl: string;
  statusCode: number;
};

export const urlShort = async (url: Params) => {
  return await axios
    .post<ApiResponse, AxiosResponse<ApiResponse>, Params>(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`,
      url
    )
    .then((res) => res.data);
};

export const CustomSlugURIShort = async ({ url, customSlug }: Params) => {
  try {
    const res = await axios.post<
      ApiResponse,
      AxiosResponse<ApiResponse>,
      Params
    >(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/customSlug`, {
      url,
      customSlug,
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    toast.error(err.response?.data.message as string);
  }
};

// getAnalytics
export type AnalyticsBody = {
  shortUrl: string;
};

export interface AnalyticResp {
  message: string;
  visitHistory: VisitHistory;
  statusCode: number;
}

export interface VisitHistory {
  totalClicks: number;
  analytics: Analytic[];
}

export interface Analytic {
  timestamp: string;
  ipAddress: string;
  _id: string;
}

export const getAnalytics = async ({ shortUrl }: AnalyticsBody) => {
  return await axios
    .post<AnalyticResp>(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/analytics/`,
      { shortUrl }
    )
    .then((res) => res.data);
};
