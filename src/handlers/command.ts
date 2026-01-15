import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/types";
import { CONTACT_TEXT, HELP_TEXT, INFO_TEXT, START_TEXT } from "./messages";
import { catService } from "./service/cat.service";
import { startService } from "./service/auth-start.service";

export const handleHelp = (bot: Telegraf<Context<Update>>) => {
  bot.help(async (ctx) => {
    await ctx.reply(HELP_TEXT, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "котят 🐱", callback_data: "cats" },
            { text: "о нас 📝", callback_data: "info" },
          ],
          [{ text: "Связаться со мной 📞", callback_data: "contact" }],
        ],
      },
    });
  });
};

export const handleStart = (bot: Telegraf<Context<Update>>) => {
  bot.start(startService);
};

export const handlKatyata = (bot: Telegraf<Context<Update>>) => {
  bot.command("kotyata", catService);
};

export const handlContact = (bot: Telegraf<Context<Update>>) => {
  bot.command("contact", async (ctx) => {
    await ctx.reply(CONTACT_TEXT);
  });
};

export const handlInfo = (bot: Telegraf<Context<Update>>) => {
  bot.command("about", async (ctx) => {
    await ctx.reply(INFO_TEXT);
  });
};
