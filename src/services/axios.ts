import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

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
  ShortUrl: string;
  statusCode: number;
};


export const urlShort = async ( url : Params) => {
  try {
    const res = await axios.post(API_BASE_URL, url);
    console.log(res.data);
    
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

