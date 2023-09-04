import {IManga} from "../interfaces/manga.interface";
import {useEffect, useState} from "react";
import {IChapter} from "../interfaces/chapter.interface";
import {
    findAllChapters,
    getChapter,
    viewChapter,
    buyChapter,
    deleteChapter,
    getDeletedChapter
} from "../services/chapter.service";
import {AxiosError, AxiosResponse} from "axios";
import useAuth from "./auth/useAuth.hook";
import useToaster from "./toast/useToaster.hook";
import {redirect} from "react-router-dom";
import {IException} from "../interfaces/exception.interface";

export const useChapter = () => {
    const toaster = useToaster();
    const [chapter, setChapter] = useState<IChapter>();
    const [chapters, setChapters] = useState<IChapter[]>();
    const SkippedChapters = localStorage.getItem('skipped_chapters') ? JSON.parse(localStorage.getItem('skipped_chapters') as string) : [];
    const {user} = useAuth();

    function getChapterByNumber(mangaSlug: string, chapterNumber: number) {
        getChapter(mangaSlug, Number(chapterNumber)).then((res: AxiosResponse<IChapter>) => {
            setChapter(res.data);
        }).catch((err) => {
            toaster.createToast({
                message: err.message,
                type: "error"
            })
            redirect('/404')
        });

        findAllChapters(mangaSlug).then((res: AxiosResponse<IChapter[]>) => {
            setChapters(res.data);
        });
    }


    function getDeletedChapterById(chapter_id: number) {
        getDeletedChapter(chapter_id).then((res: AxiosResponse<IChapter>) => {
            setChapter(res.data);
        }).catch((err) => {
            toaster.createToast({
                message: err.message,
                type: "error"
            })
            redirect('/404')
        });
    }


    function skip_chapter() {
        if (chapter && chapter.id) {
            SkippedChapters.push(chapter.id);
            localStorage.setItem('skipped_chapters', JSON.stringify(SkippedChapters));
            return true;
        } else {
            console.log("chapter not found");
            return false;
        }
    }

    function buy_chapter(chapter_id: number) {
        return new Promise((resolve, reject) => {
            buyChapter(Number(chapter_id)).then((res: AxiosResponse<any>) => {
                skip_chapter();
                toaster.createToast({
                    message: res.data?.message,
                    type: "success"
                });
                resolve(res.data);
            }).catch((err: AxiosError<any>) => {
                toaster.createToast({
                    message: err.response?.data.message || err.message,
                    type: "error"
                });
                reject(err);
            });
        });
    }

    return {chapter, getDeletedChapterById, chapters, getChapterByNumber, buy_chapter}


}
