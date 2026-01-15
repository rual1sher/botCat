import { ICat } from "../../types/type";
import { connect } from "../api";

const findAllCat = async (limit: number) => {
  const db = await connect();
  const cat = db.collection<ICat>("cat");

  const count = await cat.countDocuments();
  const cats = await cat
    .find()
    .skip(limit <= 1 ? 0 : limit - 1)
    .limit(10)
    .toArray();

  return { cats, count };
};

export let catHesh: ICat[] = [];
export let catCountHesh = 0;
let lastUpdateTime = 0;
let heshTTL = 1000 * 60 * 30;

export const getCats = async (force = false, index = 0) => {
  const now = Date.now();

  if (!force && catHesh[index] && now - lastUpdateTime < heshTTL) {
    return { cats: catHesh, count: catCountHesh };
  }

  const { cats, count } = await findAllCat(index + 1);

  catCountHesh = count;
  catHesh.push(...cats);
  lastUpdateTime = now;

  return { cats: catHesh, count };
};
