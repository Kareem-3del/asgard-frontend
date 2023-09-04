import {apiClient} from "../api/apiConfig";

export const createShortLinkAPI = async (chapterId: number , redirect_url : string , uuid : string) => {
    return await apiClient.post("/short-link", {chapterId , redirect_url , uuid});
}

export const getShortLinkAPI = async (chapterId: number) => {
    return await apiClient.get(`/short-link/${chapterId}`);
}

export const editShortLinkAPI = async (shortLinkId: string, url: string) => {
    return await apiClient.put(`/short-link/${shortLinkId}`, {url});
}
