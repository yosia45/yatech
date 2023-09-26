## Endpoints

List of Available Endpoints:

- `GET /`
- `POST /register`
- `POST /login`

### GET /

#### Description

- Show data content

#### Response

_200 - OK_

- Body
  ```json
  {
    "message" : "Success to access content"
  }
  ```


### POST /register

#### Description

- Create a new account

#### Request

- Body
  ```json
  {
    "username" : String,
    "password" : String
  }
  ```

#### Response

_201 - Ok_

- Body
  ```json
  {
    "message": "Account has been created"
  }
  ```

### POST /login

#### Description

- Log in into the application

#### Request

- Body
  ```json
  {
    "username": String,
    "password": String,
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "username" : String,
    "access_token" : Text,
    "refreshToken" : Text
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
