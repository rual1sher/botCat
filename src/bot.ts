import { session, Telegraf } from "telegraf";
import * as handlers from "./handlers/index.js";
import logger from "./middlewares/logger.js";
import { env } from "./config/env.config.js";

export const bot = new Telegraf(env.BOT_TOKEN);

setInterval(() => {
  console.log("ping");
}, 1000 * 60 * 1);

// session
bot.use(session());

// Глобальные мидлвары
bot.use(logger);

// Подключаем все обработчики
Object.values(handlers).forEach((handler) => handler(bot));
