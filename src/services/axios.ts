import axios, { AxiosResponse } from "axios";

export type Params = {
  url: string;
};

export type ServerError = {
  message: string;
  error: string;
  StatusCode: number;
};
export type ApiResponse = {
  message: string;
  ShortId: string;
  ShortUrl: string;
  statusCode: number;
};

export const urlShort = async (url: Params) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`,
      url
    );
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// getAnalytics
export type AnalyticsParams = {
  shortId: string;
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

export const getAnalytics = async ({ shortId }: AnalyticsParams) => {
  return await axios
    .get<AnalyticResp>(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/analytics/${shortId}`
    )
    .then((res) => res.data);
};
