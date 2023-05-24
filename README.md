# cycurid-oauth2-server

The cycurid-oauth2-server npm package is a part of a comprehensive OAuth 2.0 solution designed to seamlessly integrate with the cycurid-oauth2-client package. This package primarily handles the process of exchanging an authorization code, obtained from the CycurID barcode scanning process, for an OAuth access token.

This access token encapsulates the permissions as defined by the scope and allows the retrieval of user data that is both authorized by the user and compliant with server policies. By adhering to the OAuth's authorization code grant type, this process ensures a high level of security in authenticating and authorizing users while preserving the integrity and privacy of their credentials.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install cycurid-oauth2-server.

```bash
npm install cycurid-oauth2-server
```

## Usage

### Import

import Node:

```javascript
const { getToken, getUserInfo } = require('cycurid-oauth2-server');
```

### Supported methods

# <u>getToken</u>

The getToken function retrieves an access token from an OAuth 2.0 server using the authorization code obtained from the CycurID barcode.

#### Parameters

- <Strong>code</Strong> (string): The authorization code obtained from the OAuth server.
- <Strong>clientID</Strong> (string): The client ID used for authentication with the OAuth server.
- <Strong>clientSecret</Strong> (string): The client secret used for authentication with the OAuth server.

#### Example

```javascript
try {
  const accessToken = await getToken(authorizationCode, clientID, clientSecret);
  console.log('Access Token:', accessToken);
} catch (error) {
  console.error('Error:', error);
}
```

On successful exchange, the function provides an access token that can be used to fetch user data as defined in the scope. If an error occurs during the process, an ErrorResponse is returned, providing details on the error encountered.

#### Error Handling

The `getToken` function handles the following error scenarios:

##### 1. Missing or Invalid Arguments

If any of the arguments (`code`, `clientID`, or `clientSecret`) is missing or empty, a custom error object is thrown with the following properties:

- `message`: The error message indicating that all arguments must be provided and non-empty strings.
- `status`: The status code of the error, set to 400.
- `statusText`: The status text of the error, set to "All arguments must be provided and be non-empty strings."

##### 2. HTTP Request Failure or Non-200 Status Code

If the HTTP request to the OAuth server fails or returns a non-200 status code, a custom error object is thrown with the following properties:

- `message`: The error message indicating the request failure and the status code and status text.
- `status`: The status code of the error, obtained from the response.
- `statusText`: The status text of the error, obtained from the response.

##### 3. Empty Response Data

If the response from the OAuth server does not contain any data or the access token is missing, a custom error object is thrown with the following properties:

- `message`: The error message indicating the failure to obtain the access token.
- `status`: The status code of the error, set to 400.
- `statusText`: The status text of the error, set to "Bad Request."

# <u>getUserData</u>

The getUserInfo function in the cycurid-oauth2-server package is used to retrieve user information from an OAuth 2.0 server using the access token obtained through the getToken function.

#### Parameters

- <Strong>token</Strong> (required): A string representing the access token used for authentication and authorization.

#### Example

```javascript
try {
  const userInfo = await getUserInfo(token);
  console.log(userInfo);
} catch (error) {
  console.error(error);
}
```

If the call is successful, userInfo will contain the user information as per the defined scope. If an error occurs during the process, a error will be thrown detailing the problem.

#### Error Handling

The function may throw errors in the following scenarios:

##### 1. Missing or Empty Token Parameter

If the `token` parameter is missing or empty, a custom error object will be thrown with the following properties:

- `message`: The error message indicating that the token is required.
- `statusText`: The status text of the error, set to "Token is required."
- `status`: The status code of the error, set to 400.

##### 2. HTTP Request Failure or Non-200 Status Code

If the HTTP request to the server fails or returns a non-200 status code, a custom error object will be thrown with the following properties:

- `message`: The error message indicating the request failure and the status code and status text.
- `status`: The status code of the error, obtained from the response.
- `statusText`: The status text of the error, obtained from the response.

##### 3. Empty Response Data

If the response from the server does not contain any data, a custom error object will be thrown with the following properties:

- `message`: The error message indicating the failure to obtain user data from the server.
- `status`: The status code of the error, set to 400.
- `statusText`: The status text of the error, set to "Bad Request."

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT License

Copyright (c) 2022 CycurID

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

```
