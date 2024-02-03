export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserQuery {
    id?: string;
    email?: string;
}
