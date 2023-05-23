import axios, { AxiosRequestConfig } from 'axios';
import { OAUTH_SERVER } from './constants';

interface UserInfoResponse {
  status?: number;
  statusText: string;
  message?: string;
}

export async function getUserInfo(token: string): Promise<UserInfoResponse> {
  try {
    if (!token) {
      throw { statusText: 'Token is required.' };
    }

    const options: AxiosRequestConfig = {
      method: 'get',
      url: `${OAUTH_SERVER}/oauth/userinfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    if ((error as { response: { status: number; statusText: string; data: { message: string } } }).response?.status) {
      return {
        status: (error as { response: { status: number; statusText: string; data: { message: string } } }).response
          .status,
        statusText: (error as { response: { status: number; statusText: string; data: { message: string } } }).response
          .statusText,
        message: (error as { response: { status: number; statusText: string; data: { message: string } } }).response
          .data.message,
      };
    }
    return {
      statusText: (error as { statusText: string }).statusText,
    };
  }
}
