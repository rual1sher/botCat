import { config } from "dotenv";
config();

export const env = {
  BOT_TOKEN: process.env.BOT_TOKEN || "",
  MONGODB_KEY: process.env.MONGODB_KEY || "",
};
