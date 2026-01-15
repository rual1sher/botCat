import { Context } from "telegraf";
import { START_TEXT } from "../messages";
import { createUser, findOneUser } from "../../api/service/user.service";

export const startService = async (ctx: Context) => {
  await ctx.reply(START_TEXT, {
    reply_markup: {
      keyboard: [
        ["/kotyata", "/about"],
        ["/contact", "/help"],
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });

  if (ctx.from?.id) {
    const user = await findOneUser(ctx.from.id);

    if (!user) {
      const data = {
        userId: ctx.from.id,
        firstName: ctx.from.first_name,
        username: ctx.from.username,
        lastName: ctx.from.last_name,
        isBot: ctx.from.is_bot,
      };

      await createUser(data);
    }
  }
};
