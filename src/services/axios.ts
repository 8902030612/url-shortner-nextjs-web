import axios from "axios";

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
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`, url);
    console.log(res.data);
    
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

