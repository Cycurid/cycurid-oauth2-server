import fetch, { Headers } from 'node-fetch';
import FormData from 'form-data';
import { OAUTH_SERVER } from './constants';

interface TokenResponse {
  access_token: string;
  statusText: string;
}

interface ErrorResponse {
  status?: number; // Add the optional 'status' property
  statusText?: string; // Add the optional 'statusText' property
}

export async function getToken(
  code: string,
  clientID: string,
  clientSecret: string,
): Promise<string | undefined | ErrorResponse> {
  try {
    console.log(code, clientID, clientSecret);

    const data = `${clientID}:${clientSecret}`;
    let token: string;

    const buff = Buffer.from(data);
    const base64data = buff.toString('base64');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Basic ${base64data}`);

    const formdata = new FormData();
    formdata.append('grant_type', 'authorization_code');
    formdata.append('scope', 'username');
    formdata.append('code', code);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    const response = await fetch(`${OAUTH_SERVER}/oauth/token`, requestOptions);

    const responseData: TokenResponse = await response.json();
    if (response.status !== 200) {
      throw response;
    } else if (responseData.access_token) {
      token = responseData.access_token;

      return token;
    } else if (responseData.statusText) {
      return responseData.statusText;
    }

    return undefined;
  } catch (error) {
    const response = error as Response;
    return {
      status: response.status,
      statusText: response.statusText,
    };
  }
}
