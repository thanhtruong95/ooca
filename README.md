# OOCA Stress Tracking API

Create a small web-app for tracking user's stress level.

# Environment vars

This project uses the following environment variables:

| Name                        | Description             | Default Value |
| --------------------------- | ----------------------- | ------------- |
| NODE_APP_PORT               | App running port        | 9000          |
| NODE_APP_JWT_EXPIRE_MINUTES | Token expire in minutes | 240           |
| NODE_APP_JWT_KEY            | Token signature key     |               |

Note: This project is test my knowledge. So I just simply include the .evn for easy do the test.

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

| Name                | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **dist**            | Contains the distributable (or output) from your TypeScript build.                               |
| **node_modules**    | Contains all npm dependencies                                                                    |
| **src**             | Contains source code that will be compiled to the dist dir                                       |
| **src/controllers** | Controllers define functions to serve various express routes.                                    |
| **src/middleware**  | Express middleware which process the incoming requests before handling them down to the routes   |
| **src/routes**      | Contain all express routes, separated by module/area of application                              |
| **src**/index.ts    | Entry point to express app                                                                       |
| package.json        | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| tsconfig.json       | Config settings for compiling source code only written in TypeScript                             |

## Scripts

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `start`    | Runs node on dist/index.js. Can be invoked with `npm start` |
| `build`    | Runs full build. Can be invoked with `npm build`            |
| `dev`      | Runs develop mode. Can be invoked with `npm dev`            |
| `test`     | Runs build and run tests using mocha                        |
| `lint`     | Runs TSLint on project files                                |

## Testing

The tests are written in Jest

## End points

- /user/login:

  Specifies how users should be routed when they want to login.

- /stress:

  Specifies the method being requested (GET, POST).

- /stress/anonymous:

  This section defines the parameters of your endpoint. They can be defined as path, query, header, formData, or body.

- definitions:
  This section defines the structure of objects used in responses or as parameters.
