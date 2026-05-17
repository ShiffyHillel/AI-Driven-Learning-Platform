import UserDal, { USER_NOT_FOUND_ERROR, USER_ALREADY_EXISTS_ERROR } from "./user-dal";
import { User } from "./user-models";

export default class UserService {
    constructor(private userDal: UserDal) {}

    async createUser(user: User): Promise<User> {
        try {
            return await this.userDal.createUser(user);
        } catch (err: any) {
            if (err.message === USER_ALREADY_EXISTS_ERROR) {
                throw err;
            }
            throw err;
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            return await this.userDal.getUserById(id);
        } catch (err: any) {
            if (err.message === USER_NOT_FOUND_ERROR) {
                return null;
            }
            throw err;
        }
    }

    async getAllUsers(): Promise<Array<User>> {
        return this.userDal.getAllUsers();
    }
}