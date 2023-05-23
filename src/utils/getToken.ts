import fetch, { Headers } from 'node-fetch';
import { OAUTH_SERVER } from './constants';

interface TokenData {
  code: string;
  client_id: string;
  client_secret: string;
}

interface TokenResponse {
  status?: number;
  statusText: string;
}

export async function getToken(data: TokenData): Promise<TokenResponse> {
  try {
    if (!data.code) {
      throw { statusText: 'Missing code' };
    }
    if (!data.client_id) {
      throw { statusText: 'Missing client_id' };
    }
    if (!data.client_secret) {
      throw { statusText: 'Missing client_secret' };
    }

    const info = `${data.client_id}:${data.client_secret}`;
    let response: TokenResponse;

    let buff = Buffer.from(info);
    let base64data = buff.toString('base64');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Basic ${base64data}`);

    var formdata = new FormData();
    formdata.append('grant_type', 'authorization_code');
    formdata.append('scope', 'username');
    formdata.append('code', data.code);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    const res = await fetch(`${OAUTH_SERVER}/oauth/token`, requestOptions);
    if (res.status !== 200) {
      throw res;
    }

    const text = await res.text();
    response = JSON.parse(text);

    return response;
  } catch (error) {
    if ((error as { status: number }).status) {
      return {
        status: (error as { status: number }).status,
        statusText: (error as { statusText: string }).statusText,
      };
    }
    return {
      statusText: (error as { statusText: string }).statusText,
    };
  }
}
