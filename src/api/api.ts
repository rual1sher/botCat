import { MongoClient } from "mongodb";
import { env } from "../config/env.config";

let dbClient: MongoClient | null = null;

async function mongoDb() {
  if (dbClient) return dbClient;

  dbClient = new MongoClient(env.MONGODB_KEY, {
    maxPoolSize: 10,
    minPoolSize: 5,
  });

  await dbClient.connect();
  console.log("MongoDB подключён");

  return dbClient;
}

export const connect = async () => {
  const connect = await mongoDb();
  return connect.db("telegram-bot");
};
