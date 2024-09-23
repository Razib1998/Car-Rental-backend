import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_TOKEN,
};
