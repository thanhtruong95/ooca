process.env.NODE_APP_PORT = "2000";
process.env.NODE_ENV = "test";
process.env.NODE_APP_JWT_KEY = "key";
import request from "supertest";
import app from "../src/index";

export const server = request(app);
