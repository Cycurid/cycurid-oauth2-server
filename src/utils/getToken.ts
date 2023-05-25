import fetch, { Headers, RequestInit } from 'node-fetch';
import FormData from 'form-data';
import { OAUTH_SERVER } from './constants';

interface TokenResponse {
  access_token: string;
  statusText: string;
}

interface CustomError extends Error {
  status?: number;
  statusText?: string;
}

interface FetchOptions extends RequestInit {
  headers: Headers;
  body: FormData;
}

function createHeaders(clientID: string, clientSecret: string): Headers {
  const data = `${clientID}:${clientSecret}`;
  const base64data = Buffer.from(data, 'utf-8').toString('base64');
  const headers = new Headers();
  headers.append('Authorization', `Basic ${base64data}`);
  return headers;
}

function createBody(code: string): FormData {
  const formdata = new FormData();
  formdata.append('grant_type', 'authorization_code');
  formdata.append('scope', 'username');
  formdata.append('code', code);
  return formdata;
}

export async function getToken(code: string, clientID: string, clientSecret: string): Promise<string> {
  if (!code || !clientID || !clientSecret) {
    const error: CustomError = new Error('All arguments must be provided and be non-empty strings');
    error.status = 400;
    error.statusText = 'All arguments must be provided and be non-empty strings';
    throw error;
  }

  try {
    const headers = createHeaders(clientID, clientSecret);
    const body = createBody(code);

    const requestOptions: FetchOptions = {
      method: 'POST',
      headers,
      body,
    };

    const response = await fetch(`${OAUTH_SERVER}/oauth/token`, requestOptions);
    const responseData: TokenResponse = await response.json();

    if (response.status !== 200) {
      const error: CustomError = new Error(`Request failed with status code ${response.status} ${response.statusText}`);
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    if (!responseData.access_token) {
      const error: CustomError = new Error('Failed to obtain access token');
      error.status = 400;
      error.statusText = 'Bad Request';
      throw error;
    }

    return responseData.access_token;
  } catch (error) {
    throw error;
  }
}
