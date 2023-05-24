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

### <u>getToken</u>

The getToken function retrieves an access token from an OAuth 2.0 server using the authorization code obtained from the CycurID barcode.

#### Example

```javascript
const tokenResponse = await getToken(code: string, clientID: string, clientSecret: string)
```

On successful exchange, the function provides an access token that can be used to fetch user data as defined in the scope. If an error occurs during the process, an ErrorResponse is returned, providing details on the error encountered.

### <u>getUserData</u>

The getUserInfo function in the cycurid-oauth2-server package is used to retrieve user information from an OAuth 2.0 server using the access token obtained through the getToken function.

#### Example

```javascript
const userInfo = await getUserInfo(tokenResponse:string);   
```

If the call is successful, userInfo will contain the user information as per the defined scope. If an error occurs during the process, userInfo will contain an error message detailing the problem.

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
