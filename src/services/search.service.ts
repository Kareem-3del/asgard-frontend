import {apiClient} from "../api/apiConfig";
import {MangaTypesEnum, StatusTypeEnum} from "../interfaces/manga.interface";

export const getLatestMangaUpdatesAPI = async () => {
    return await apiClient.get("/search/latest");
}


export const getTopMangaViewsAPI = async () => {
    return await apiClient.get("/search/top");
}

export const searchAPI = async (skip : number , text: string, include_genres?: number[], exclude_genres?: number[], count : number = 10 , type? : MangaTypesEnum , status? : StatusTypeEnum) => {
    console.log("searchAPI", text, include_genres, exclude_genres, skip, count);
    return await apiClient.get("/search", {
        params: {
            text,
            type,
            status,
            include_genres,
            exclude_genres,
            skip,
            count
        }
    });
}
