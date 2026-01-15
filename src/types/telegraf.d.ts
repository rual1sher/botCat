import { Context } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

declare module "telegraf" {
  interface Context<U extends Update = Update> {
    session?: {
      currentCatIndex?: number;
    };
  }
}
