import { connect } from "../api";

export const findOneUser = async (id: number) => {
  const db = await connect();
  return db
    .collection("user")
    .findOne({ userId: id }, { projection: { _id: 0 } });
};

export const createUser = async (data: any) => {
  const db = await connect();
  return db.collection("user").insertOne(data);
};
