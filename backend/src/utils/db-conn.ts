import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGODB_URI!;
const DB_NAME = process.env.MONGODB_DB_NAME!;

export default class DbConn {
    private client!: MongoClient;

    async init() {
        this.client = await MongoClient.connect(DB_URL);
        console.log("Connected to MongoDB ✅");
    }

    getDb(): Db {
        return this.client.db(DB_NAME);
    }

    async terminate() {
        await this.client.close();
    }
}