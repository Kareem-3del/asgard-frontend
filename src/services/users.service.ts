import {apiClient} from "../api/apiConfig";

export const getUsersAPI = async () => {
    return await apiClient.get("/users");
}
export const getUserAPI = async (userId: string|number) => {
    return await apiClient.get(`/users/${userId}`);
}
