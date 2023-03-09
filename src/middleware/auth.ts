import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User, UserLogged } from "../types/interfaces";
import { ERROR_TYPEs } from "../utils/constants";
export const auth =
  (allowRoles: string[] = []) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string | undefined = req
        .header("Authorization")
        ?.replace("Bearer ", "");
      if (!token) {
        throw "token can not be undefined";
      }

      const _user = jwt.verify(
        token || "",
        process.env.NODE_APP_JWT_KEY as Secret
      ) as User;
      if (!_user) {
        throw "unexpected user object";
      }

      if (allowRoles.length > 0 && !allowRoles.includes(_user.role)) {
        res.status(ERROR_TYPEs.ACCESS_DENIED.code).send({
          data: null,
          error: {
            status: ERROR_TYPEs.ACCESS_DENIED.code,
            name: ERROR_TYPEs.ACCESS_DENIED.name,
            message: ERROR_TYPEs.ACCESS_DENIED.message,
            detail: {},
          },
        });
      }

      const _userLogged: UserLogged = {
        user: _user,
        token,
      };

      req.headers.user = JSON.stringify(_userLogged);
      next();
    } catch (error) {
      return res.status(ERROR_TYPEs.UNAUTHORIZED.code).send({
        data: null,
        error: {
          status: ERROR_TYPEs.UNAUTHORIZED.code,
          name: ERROR_TYPEs.UNAUTHORIZED.name,
          message: ERROR_TYPEs.UNAUTHORIZED.message,
          detail: {},
        },
      });
    }
  };
