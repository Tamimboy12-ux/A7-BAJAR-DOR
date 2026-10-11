import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("bajar-dor");

export const auth = betterAuth({
   emailAndPassword: { 
    enabled: true, 
  },

  database: mongodbAdapter(db, {
    client,
  }),
});