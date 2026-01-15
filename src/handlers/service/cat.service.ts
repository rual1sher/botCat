import { Context } from "telegraf";
import { catCountHesh, getCats } from "../../api/service/cat.service";
import { CATS_TEXT } from "../messages";
import { keyboardCat } from "../../utils/keyboard";

export const catService = async (ctx: Context) => {
  const loadingMsg = await ctx.reply("🔮 Поиск котят...");
  try {
    const session = ctx.session?.currentCatIndex || 0;

    const { cats } = await getCats(false, session);
    await ctx.deleteMessage(loadingMsg.message_id);

    if (cats.length === 0) return await ctx.reply("Пока что котят нет 😿");
    if (!session) ctx.session = { currentCatIndex: 0 };

    await ctx.reply(CATS_TEXT(cats[session]), {
      reply_markup: keyboardCat(session + 1, catCountHesh),
    });
  } catch (err) {
    console.log(err);
    await ctx.deleteMessage(loadingMsg.message_id);
    await ctx.reply("Что-то пошло не так... 😿 Попробуй позже");
  }
};
