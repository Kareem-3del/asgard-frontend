import {IChp} from "../pages/account/admin/bin-admin/ChapterList";

export interface INotification {
    id: number;
    type: "chapter" | "message";
    chapter?: IChp;
    chapter_id?: number;

}