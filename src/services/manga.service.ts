import {apiClient} from "../api/apiConfig";
import {AxiosResponse} from "axios";
import {ICreateManga, IManga, ISearchManga, IUpdateManga} from "../interfaces/manga.interface";

const getMangaByIdAPI = async (id: number | string): Promise<AxiosResponse<IManga>> => {
    return await apiClient.get(`manga/${id}`) as AxiosResponse<IManga>;
}


const getMangaAPI = async ({offset = 0, limit = 20, startId,}: { offset?: number, limit?: number, startId?: number }): Promise<AxiosResponse<IManga>> => {
    return await apiClient.get(`manga/`, {
        params: {
            offset,
            limit,
            startId
        }
    }) as AxiosResponse<IManga>;
}
const getMangaBySlugAPI = async (slug: string): Promise<AxiosResponse<IManga>> => {
    return await apiClient.get(`manga/slug/${slug}`) as AxiosResponse<IManga>;
}
const createMangaForm = (data: ICreateManga) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('story', data.story);
    formData.append('cover', data.cover);
    formData.append('type', (data.type).toString());
    formData.append('status', (data.status).toString());
    for (let i = 0; i < data.genres.length; i++) {
        formData.append('genres[]', String(data.genres[i]));
    }
    if (data.background) {
        formData.append('background', data.background);
    }
    return formData;
}
const createMangaAPI = (data: ICreateManga) => {
    return apiClient.post("manga", createMangaForm(data), {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
}
const updateMangaAPI = (id: number, data: IUpdateManga) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.story) formData.append('story', data.story);
    if (data.type) formData.append('type', (data.type).toString());
    if (data.status) formData.append('status', (data.status).toString());
    if (data.genres) {
        for (let i = 0; i < data.genres.length; i++) {
            formData.append('genres[]', String(data.genres[i]));
        }
    }
    if (data.background) {
        formData.append('background', data.background);
    }
    if (data.cover) {
        formData.append('cover', data.cover);
    }

    return apiClient.put(`manga/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
}
const deleteMangaAPI = (id: number) => {
    return apiClient.delete(`manga/${id}`);
}
const followMangaAPI = (id: number) => {
    return apiClient.post(`manga/${id}/follow`);
}
const unfollowMangaAPI = (id: number) => {
    return apiClient.delete(`manga/${id}/follow`);
}
const getMangaFollowersAPI = (id: number) => {
    return apiClient.get(`manga/${id}/followers`);
}
const getMangaUsersWorkingAPI = (id: number) => {
    return apiClient.get(`manga/${id}/users_working`);
}

export const getMangaAdminAPI = async ({offset = 0, limit = 20, startId,}: { offset?: number, limit?: number, startId?: number }): Promise<AxiosResponse<ISearchManga>> => {
    return await apiClient.get(`manga/`, {
        params: {
            offset,
            limit,
            startId,
            admin: true
        }
    }) as AxiosResponse<ISearchManga>;
}
export default {
    getMangaByIdAPI,
    getMangaAPI,
    getMangaBySlugAPI,
    createMangaAPI,
    updateMangaAPI,
    deleteMangaAPI,
    followMangaAPI,
    unfollowMangaAPI,
    getMangaFollowersAPI,
    getMangaUsersWorkingAPI,
    getMangaAdminAPI
};
