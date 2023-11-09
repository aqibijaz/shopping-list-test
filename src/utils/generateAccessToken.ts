import { CONSTANTS } from "src/config";
import { jwtInfo } from "../types/jwtInfo";

import jwt from "jsonwebtoken";

export const generateAccessToken = (info: jwtInfo) =>
  jwt.sign(info, CONSTANTS.ACCESS_SECRET_KEY as string, {
    expiresIn: "1h",
  });
