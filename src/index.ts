import { session } from "telegraf";
import { bot } from "./bot.ts";

async function bootstrap() {
  await bot.launch();
}

bootstrap();
console.log("Bot started");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
