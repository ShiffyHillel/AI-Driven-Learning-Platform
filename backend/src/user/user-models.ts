export interface User {
    id: string;
    name: string;
    phone: string;
    createdAt: Date;
}

export interface UserWithId extends User {
    _id?: any;
}