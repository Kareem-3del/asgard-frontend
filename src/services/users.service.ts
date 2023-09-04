import {apiClient} from "../api/apiConfig";

export const getUsersAPI = async () => {
    return await apiClient.get("/users");
}
