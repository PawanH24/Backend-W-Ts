import dotenv from "dotenv";
dotenv.config();
//import "dotenv/config"

const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT!!,
  DB_URI: process.env.DB_URI!!,

  //jwt
  JWT_SECRET: process.env.JWT_SECRET!!,
  JWT_EXPIRES_IN: process.env,
};
//zod validation for env .process env validate ok then let it run otherwise no
export default ENV_CONFIG;
