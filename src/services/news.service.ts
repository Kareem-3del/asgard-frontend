import {apiClient} from "../api/apiConfig";

export const getNews = async () => {
    return await apiClient.get('/news');
}

export const getNewsById = async (id: number) => {
    return await apiClient.get(`/news/${id}`);
}


export interface CreateNewsDto {
    title: string;

    content: string;

    image: string | ArrayBuffer;
}

export const createNews = async (data: CreateNewsDto) => {
    return await apiClient.post('/news', data);
}
