import { Request, Response, NextFunction } from "express";
import { getUserByUserName } from "../services/user.service";
import jwt, { Secret } from "jsonwebtoken";
import { ERROR_TYPEs } from "../utils/constants";

const TOKEN_EXPIRE_MINUTES: number =
  (process.env.NODE_APP_JWT_EXPIRE_MINUTES as unknown as number) || 240;

export const user_login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const _user = await getUserByUserName(username);
    if (_user && _user.username === username && _user.password === password) {
      return res.send({
        data: {
          jwt: jwt.sign(
            {
              id: _user.id,
              firstName: _user.firstName,
              lastName: _user.lastName,
              role: _user.role,
            },
            process.env.NODE_APP_JWT_KEY as Secret,
            { expiresIn: TOKEN_EXPIRE_MINUTES * 60}
          ),
        },
      });
    }

    return res.status(ERROR_TYPEs.NOT_FOUND.code).send({
      data: null,
      error: {
        status: ERROR_TYPEs.NOT_FOUND.code,
        name: ERROR_TYPEs.NOT_FOUND.name,
        message: "Invalid username and/or password",
        detail: {},
      },
    });
  } catch (error) {
    next(error);
  }
};
