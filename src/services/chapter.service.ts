import {apiClient} from "../api/apiConfig";
import {ICreateChapter} from "../interfaces/chapter.interface";


export const findAllChapters = async (mangaSlug: string) => {
    return await apiClient.get(`/manga/${mangaSlug}/chapter`);
}

export const findOneChapter = async (mangaId: number, chapterId: number) => {
    return await apiClient.get(`/manga/${mangaId}/chapter/${chapterId}`);
}

const createFormFromChapter = (chapter: ICreateChapter) => {
    const formData = new FormData();
    if(chapter.title) formData.append("title", chapter.title);
    formData.append("number", chapter.number.toString());
    if(chapter.content_text) formData.append("content_text", chapter.content_text);
    if(chapter.zipFile) formData.append("zipFile", chapter.zipFile);
    return formData;
}

export const createChapter = async (mangaSlug: string, chapter: ICreateChapter) => {
    if(chapter.zipFile) {
        return await apiClient.post(`/manga/${mangaSlug}/chapter`, createFormFromChapter(chapter), {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } else {
        return await apiClient.post(`/manga/${mangaSlug}/chapter_novel`, chapter);
    }
}

export const getChapter = async (mangaSlug: string, chapterNumber: number) => {
    return await apiClient.get(`/manga/${mangaSlug}/chapter/${chapterNumber}`);
}

export const viewChapter = async (mangaId: number, chapterNumber: number) => {
    return await apiClient.post(`/manga/${mangaId}/chapter/view/${chapterNumber}`);
}

export const buyChapter = async (chapterId: number) => {
    return await apiClient.post(`/chapter/buy/${chapterId}`);
}



export const deleteChapter = async (chapterId: number) => {
    return await apiClient.delete(`/chapter/${chapterId}`);
}


export const confirmDeleteChapter = async (chapterId: number) => {
    return await apiClient.delete(`/chapter/${chapterId}/confirm`);
}

export const restoreChapter = async (chapterId: number) => {
    return await apiClient.post(`/chapter/${chapterId}/restore`);
}

export const getDeletedChapters = async (take:number = 10,skip:number = 0) => {
    return await apiClient.get(`/chapter/deleted?take=${take}&skip=${skip}`);
}

export const getDeletedChapter = async (chapterId: number) => {
    return await apiClient.get(`/chapter/deleted/${chapterId}`);
}