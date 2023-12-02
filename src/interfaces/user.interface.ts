import {IManga, IRate} from "./manga.interface";

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
    discord_url: string,
    instagram_url: string,
    allow_notifications: boolean,
    allow_messages: boolean,
    rates: IRate[],
    manga_favorite: IManga[],
    manga_work_in: IManga[],
    chaptersBought: IManga[],
}
export interface ILogin {
    token: string,
    available_time: number,
}
