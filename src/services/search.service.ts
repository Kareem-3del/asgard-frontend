import {apiClient} from "../api/apiConfig";

export const getLatestMangaUpdatesAPI = async () => {
    return await apiClient.get("/search/latest");
}


export const getTopMangaViewsAPI = async () => {
    return await apiClient.get("/search/top");
}

export const searchAPI = async (skip : number , text: string, include_genres?: number[], exclude_genres?: number[], count : number = 10) => {
    return await apiClient.get("/search", {
        params: {
            text,
            include_genres,
            exclude_genres,
            skip,
            count
        }
    });
}
