import { Collection } from "mongodb";
import DbConn from "../utils/db-conn";
import { User, UserWithId } from "./user-models";

const USER_COLLECTION_NAME = "users";
export const USER_NOT_FOUND_ERROR = "User not found";
export const USER_ALREADY_EXISTS_ERROR = "User already exists";

export default class UserDal {
    private userCollection: Collection<User>;

    constructor(dbConn: DbConn) {
        this.userCollection = dbConn.getDb().collection(USER_COLLECTION_NAME);
    }

    async createUser(user: User): Promise<User> {
        const existing = await this.userCollection.findOne({ phone: user.phone });
        if (existing) {
            throw new Error(USER_ALREADY_EXISTS_ERROR);
        }
        await this.userCollection.insertOne(user);
        return user;
    }

    async getUserById(id: string): Promise<User> {
        const user: UserWithId | null = await this.userCollection.findOne({ id });
        if (!user) {
            throw new Error(USER_NOT_FOUND_ERROR);
        }
        delete user._id;
        return user;
    }

    async getAllUsers(): Promise<Array<User>> {
        const users: Array<UserWithId> = await this.userCollection.find({}).toArray();
        users.forEach(u => delete u._id);
        return users;
    }
}