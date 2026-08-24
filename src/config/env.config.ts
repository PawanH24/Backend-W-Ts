import dotenv from "dotenv";
dotenv.config();
// import * as z from "zod";
//import "dotenv/config"

const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT!!,
  DB_URI: process.env.DB_URI!!,

  //jwt
  JWT_SECRET: process.env.JWT_SECRET!!,
  JWT_EXPIRES_IN: process.env,

  //cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!!,
};

// const envSchema = z.object({
//   NODE_ENV: z.enum(["development", "production", "test"]),
//   PORT: z.coerce.number(),
//   DB_URI: z.string().min(1),

//   // jwt
//   JWT_SECRET: z.string().min(1),
//   JWT_EXPIRES_IN: z.string().min(1),
// });

// const ENV_CONFIG = envSchema.parse(process.env);
export default ENV_CONFIG;
