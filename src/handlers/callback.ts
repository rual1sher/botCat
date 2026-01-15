import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/types";
import { CATS_TEXT, CONTACT_TEXT, INFO_TEXT } from "./messages";
import { catService } from "./service/cat.service";
import { catCountHesh, getCats } from "../api/service/cat.service";
import { keyboardCat, keyboardOrder } from "../utils/keyboard";

const actionCats = (bot: Telegraf<Context<Update>>) => {
  bot.action("cats", async (ctx) => {
    await ctx.answerCbQuery("Кнопка нажата!");
    await ctx.deleteMessage();

    await catService(ctx);
  });
};

const actionInfo = (bot: Telegraf<Context<Update>>) => {
  bot.action("info", async (ctx) => {
    await ctx.answerCbQuery("Кнопка нажата!");
    await ctx.deleteMessage();

    await ctx.reply(INFO_TEXT);
  });
};

const actionContact = (bot: Telegraf<Context<Update>>) => {
  bot.action("contact", async (ctx) => {
    await ctx.answerCbQuery("Кнопка нажата!");
    await ctx.deleteMessage();

    await ctx.reply(CONTACT_TEXT);
  });
};

const activePrevCat = (bot: Telegraf<Context<Update>>) => {
  bot.action("prev_cat", async (ctx) => {
    await ctx.answerCbQuery("Кнопка нажата!");
    await ctx.deleteMessage();

    const session = ctx.session?.currentCatIndex || 0;

    if (session > 0) ctx.session = { currentCatIndex: session - 1 };

    await catService(ctx);
  });
};

const activeNextCat = (bot: Telegraf<Context<Update>>) => {
  bot.action("next_cat", async (ctx) => {
    await ctx.answerCbQuery("Кнопка нажата!");
    await ctx.deleteMessage();

    const session = ctx.session?.currentCatIndex || 0;

    console.log(session);

    if (session + 2 <= catCountHesh) {
      ctx.session = { currentCatIndex: session + 1 };
    }

    await catService(ctx);
  });
};

const activeOrder = (bot: Telegraf<Context<Update>>) => {
  bot.action("order", async (ctx) => {
    await ctx.answerCbQuery("Кнопка нажата!");
    await ctx.deleteMessage();

    const loadingMsg = await ctx.reply("⏳ в ожидании...");
    await ctx.deleteMessage(loadingMsg.message_id);

    if (ctx.session?.currentCatIndex !== undefined) {
      const index = ctx.session.currentCatIndex;
      const { cats } = await getCats(true, index);

      const cat = cats[index];

      return await ctx.reply(CATS_TEXT(cat), {
        reply_markup: keyboardOrder(cat?.price),
      });
    }

    await ctx.reply("asd");
  });
};

export const hadlerCallback = (bot: Telegraf<Context<Update>>) => {
  actionCats(bot);
  actionInfo(bot);
  actionContact(bot);
  activePrevCat(bot);
  activeNextCat(bot);
  activeOrder(bot);
};
