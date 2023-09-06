import {IShortLink} from "./short-link.interface";

export interface IChapter {
    id: number;
    number: number;
    views: number;
    title: string;
    short_link: IShortLink;
    images_urls: string[];
    created_at: string;
    by_user_id: number;
    badge? : string
}

export interface ICreateChapter {
    number: number;
    title?: string;
    zipFile : File;
}
