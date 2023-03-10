# OOCA Stress Tracking API

Create a small web-app for tracking user's stress level.

# Environment vars

This project uses the following environment variables:

| Name                        | Description             | Default Value |
| --------------------------- | ----------------------- | ------------- |
| NODE_APP_PORT               | App running port        | 9000          |
| NODE_APP_JWT_EXPIRE_MINUTES | Token expire in minutes | 240           |
| NODE_APP_JWT_KEY            | Token signature key     |               |

Note: This project test my knowledge. So I just simply include the .evn for easy do the test.

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 16+
- Add the vscode plugin 'rest Client'. This plugin can help make the apis test which stored in postman.http

# Getting started

- Clone the repository

```
git clone  git@github.com:thanhtruong95/ooca.git
```

- Install dependencies

```
cd ooca
npm install
npm run prepare
```

- Run the project at develop mode

```
npm run dev
```

Navigate to `http://localhost:9000`

## Project Structure

The folder structure of this app is explained below:

| Name                | Description                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **dist**            | Contains the distributable (or output) from your TypeScript build.                             |
| **node_modules**    | Contains all npm dependencies                                                                  |
| **src**             | Contains source code that will be compiled to the dist dir                                     |
| **src/controllers** | Controllers define functions to serve various express routes.                                  |
| **src/middleware**  | Express middleware which process the incoming requests before handling them down to the routes |
| **src/routes**      | Contain all express routes, separated by module/area of application                            |
| **src/datas**       | Contains all the the app data                                                                  |
| **src**/index.ts    | Entry point to express app                                                                     |
| package.json        | Contains npm dependencies as well as                                                           |
| tsconfig.json       | Config settings for compiling source code only written in TypeScript                           |

## Scripts

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `start`    | Runs node on dist/index.js. Can be invoked with `npm start` |
| `build`    | Runs full build. Can be invoked with `npm build`            |
| `dev`      | Runs develop mode. Can be invoked with `npm dev`            |
| `test`     | Runs build and run tests using jest                         |
| `lint`     | Runs TSLint on project files                                |

## Testing

The tests are written in Jest

```
npm run test
```

## End points

Please open the <b>postman.http</b> file attached in the project to test the APIs (remember install <b>rest client</b> plugin before execute api route)

- POST /user/login:

  Specifies how users should be routed when they want to login.

  ```
  POST {{BASE_URL}}/user/login HTTP/1.1
  Content-Type: application/json
  {
    "username": "guest",
    "password": "guest"
  }
  ```

- GET /stress/{userId}:

  Specifies how users should be routed when they want to get stresses by userId.

  ```
  GET {{BASE_URL}}/stress/97e490db-f099-4a12-9fd0-f5aaa951f575 HTTP/1.1

  ```

- POST /stress/anonymous:

  - Specifies how users who are anonymous should be routed when they want to create their stress record.
  - When a guest visits our app, the front-end should generate an ID to define who they are then store the id to localStorage or sessionStorage

  ```
  POST {{BASE_URL}}/stress/anonymous HTTP/1.1
  Authorization: {{TOKEN}}
  Content-Type: application/json

  {
    "stressLevelId": 2,
    "anonymousId": "anonymousId"
  }
  ```

- POST /stress:

  Specifies how users who are authenticated should be routed when they want to create their stress record.

  ```
  POST {{BASE_URL}}/stress HTTP/1.1
  Authorization: {{TOKEN}}
  Content-Type: application/json

  {
    "stressLevelId": 2
  }
  ```

- POST /stress/{stressId}/upload:

  Specifies how users should be routed when they want to upload their image related to a stress.

  ```
  POST  {{BASE_URL}}/stress/db0104ef-6cfe-4cbb-bc6f-a991a2f8c109/upload HTTP/1.1
  Authorization: {{TOKEN}}
  Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

  ------WebKitFormBoundary7MA4YWxkTrZu0gW
  Content-Disposition: form-data; name="image"; filename="logo-avatar.png"

  < /Users/alextruong/Workspace/logo-avatar.png
  ------WebKitFormBoundary7MA4YWxkTrZu0gW--
  ```
