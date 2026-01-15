import { ObjectId } from "mongodb";

export interface ICat {
  _id: ObjectId;
  name: string;
  size: string;
  weight: string;
  color: string;
  price: string;
  order: string;
  image: string;
}

export interface ISession {
  currentCatIndex?: number;
}
