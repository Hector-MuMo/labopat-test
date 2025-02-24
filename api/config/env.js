import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  mongoDBPassword: process.env.MONGODB_PASSWORD
}