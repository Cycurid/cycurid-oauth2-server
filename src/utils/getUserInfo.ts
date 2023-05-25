import axios, { AxiosRequestConfig } from 'axios';
import { OAUTH_SERVER } from './constants';

interface UserInfoResponse {
  access_token: string;
  statusText: string;
}

interface CustomError extends Error {
  status?: number;
  statusText?: string;
}

export async function getUserInfo(token: string): Promise<UserInfoResponse> {
  try {
    if (!token) {
      const error: CustomError = new Error('Token is required.');
      error.statusText = 'Token is required.';
      error.status = 400;
      throw error;
    }

    const options: AxiosRequestConfig = {
      method: 'get',
      url: `${OAUTH_SERVER}/oauth/userinfo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(options);

    if (response.status !== 200) {
      const error: CustomError = new Error(`Request failed with status code ${response.status} ${response.statusText}`);
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    if (!response.data) {
      const error: CustomError = new Error('Failed to obtain user data from server');
      error.status = 400;
      error.statusText = 'Bad Request';
      throw error;
    }

    return response.data;
  } catch (error: any) {
    throw error;
  }
}
