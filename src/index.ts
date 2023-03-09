import express, {
  Request,
  Response,
  Application,
  NextFunction,
  json,
  urlencoded,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import os from "os";
import logger from "./utils/logger";
import { ERROR_TYPEs } from "./utils/constants";
const app: Application = express();
import userRoute from "./routes/user.route";
import stressRoute from "./routes/stress.route";

const PORT = process.env.NODE_APP_PORT || 9000;

//SET UV_THREADPOOL_SIZE
process.env.UV_THREADPOOL_SIZE = os.cpus().length as unknown as string;

/**
 * MIDDLEWARE
 */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
// set trust proxy if your service run behind proxy
app.set(
  "trust proxy",
  process.env.NODE_APP_PORT_TRUST_PROXY?.toUpperCase() === "TRUE"
);

/**
 * ROUTES
 */
app.use("/user", userRoute);
app.use("/stress", stressRoute);

/**
 * ERROR
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(
    `${500} - ${err.message} - ${req.originalUrl} - method: ${
      req.method
    } - ip: ${req.ip} - body: ${JSON.stringify(
      req.body
    )} - query: ${JSON.stringify(req.query)}`
  );

  return res.status(500).send({
    data: null,
    error: {
      status: ERROR_TYPEs.SERVER_ERROR.code,
      name: ERROR_TYPEs.SERVER_ERROR.name,
      message: ERROR_TYPEs.SERVER_ERROR.name,
      detail:
        process.env.NODE_ENV === "production" ? "Something went wrong" : err,
    },
  });
});

/**
 * NOT FOUND
 */
app.use((req: Request, res: Response) => {
  res.status(ERROR_TYPEs.URL_NOT_FOUND_URL.code).send({
    data: null,
    error: {
      status: ERROR_TYPEs.URL_NOT_FOUND_URL.code,
      name: ERROR_TYPEs.URL_NOT_FOUND_URL.name,
      message: ERROR_TYPEs.URL_NOT_FOUND_URL.name,
      detail: null,
    },
  });
});

/**
 * START APP
 */
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    // // eslint-disable-next-line no-console
    console.log(`⚡️[App]: Server is running at port:${PORT}`);
  });
}

export default app;
