import fetch, { Headers, RequestInit } from 'node-fetch';
import FormData from 'form-data';
import { OAUTH_SERVER } from './constants';

interface TokenResponse {
  access_token: string;
  statusText: string;
}

interface ErrorResponse {
  status: number;
  statusText: string;
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

export async function getToken(code: string, clientID: string, clientSecret: string): Promise<string | ErrorResponse> {
  if (!code || !clientID || !clientSecret) {
    throw new Error('All arguments must be provided and be non-empty strings');
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
      return {
        status: response.status,
        statusText: `Request failed with status code ${response.status}`,
      };
    }

    if (!responseData.access_token) {
      return {
        status: 400,
        statusText: 'Failed to obtain access token',
      };
    }

    return responseData.access_token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        status: 500,
        statusText: error.message,
      };
    }

    throw new Error('Unknown error occurred.');
  }
}
