import {IUser} from "./user.interface";
import {IChapter} from "./chapter.interface";
import {IGenre} from "./genre.interface";

export enum StatusTypeEnum {
    "Finished",
    "Stopped",
    "Ongoing",
}
export enum MangaTypesEnum {
    "Manga",
    "Manhwa",
    "Manhua",
    "Webtoon",
    "Novel",
}

export interface IManga {
    id: number;
    title: string;
    story: string;
    cover_url: string;
    background_url: string;
    slug: string;
    views: number;
    status: StatusTypeEnum;
    type: MangaTypesEnum;
    genres: IGenre[];
    created_at: string;
    updated_at: string;
    chapters: IChapter[];
    users_working: IUser[];
    created_by: IUser;
}

export interface ICreateManga {
    title: string;
    story: string;
    cover: File;
    background?: File;
    type: string;
    status: string;
    genres: number[];
}

export interface IUpdateManga {
    title?: string;
    story?: string;
    cover?: File;
    background?: File;
    type?: string;
    status?: string;
    genres?: number[];
}
export interface ISearchManga {
    items: IManga[];
    count: number;
}
