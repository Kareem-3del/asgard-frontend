import {IManga} from "./manga.interface";

export interface IUser {
    id: number,
    username: string,
    email: string,
    "bio": string,
    "createdAt": Date,
    "following": IManga[],
    "register_age": string,
    "cover_url": string,
    "avatar_url": string
    "role_name": string,
    "coins": number,
}
export interface ILogin {
    token: string,
    available_time: number,
}
