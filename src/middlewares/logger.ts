import { Context, Middleware } from "telegraf";
import { Update } from "telegraf/types";

const logger: Middleware<Context, Update> = async (ctx, next) => {
  const user = ctx.from?.username || ctx.from?.first_name || "unknown";

  console.log(
    `[${new Date().toLocaleDateString()}] ${user}: ${ctx.text || "..."}`
  );
  await next();
};

export default logger;
