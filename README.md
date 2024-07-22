# auth-module
Authentification module written in JavaScript using Node.JS, Express, SQLite3 and CryptoJS. Designed for future use in some of my projects.

## Routes
### POST /api/login
#### Query parameters
| param    | typeof | required | example_value | desc                       |
|----------|--------|----------|---------------|----------------------------|
| username | string | yes      | 'creepy0964'  | Username                   |
| password | string | yes      | '123456'      | Password. Converted to MD5 |

#### Responses
| http_code        | desc                                  | reason                              |
|------------------|---------------------------------------|-------------------------------------|
| 200 OK           | Server succesfully logged the user in | -                                   |
| 401 UNAUTHORIZED | Invalid credentials                   | User not found / Incorrect password |

#### Examples
200 OK
```json
{
    'login': 'ok'
}
```
401 UNAUTHORIZED
```json
{
    'login': 'fail',
    'reason': 'user not found'
}
```

### POST /api/register
#### Query parameters
| param    | typeof | required | example_value | desc                       |
|----------|--------|----------|---------------|----------------------------|
| username | string | yes      | 'creepy0964'  | Username                   |
| password | string | yes      | '123456'      | Password. Converted to MD5 |

#### Responses
| http_code                 | desc                                               | reason                             |
|---------------------------|----------------------------------------------------|------------------------------------|
| 200 OK                    | Server succesfully registered the user             | -                                  |
| 400 BAD_REQUEST           | Invalid request body: some credentials are missing | No username / password is provided |
| 409 CONFLICT              | User already exists                                | User already exists                |
| 500 INTERNAL_SERVER_ERROR | Returned when error is not specified               | -                                  |

#### Examples
200 OK
```json
{
    'register': 'ok'
}
```
400 BAD_REQUEST
```json
{
    'register': 'fail',
    'reason': 'no username / no password'
}
```
409 CONFLICT
```json
{
    'register': 'fail',
    'reason': 'user already exists'
}
```
500 INTERNAL_SERVER_ERROR
```json
{
    'register': 'fail',
    'reason': ''
}
```