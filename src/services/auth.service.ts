import {apiClient} from "../api/apiConfig";
import {AxiosError, AxiosResponse} from "axios";
import {ILogin, IUser} from "../interfaces/user.interface";
import {IException} from "../interfaces/exception.interface";

const register = (username: string, email: string, password: string) => {
    return apiClient.post("auth/register", {
        username,
        email,
        password,
    });
};

const login = (email: string, password: string) => {
    return apiClient
        .post("auth/login", {
            email,
            password,
        })
        .then((response: AxiosResponse<{ login: ILogin, user: IUser }>) => {
            if (response.data?.login?.token) {
                const token = response.data.login.token
                localStorage.setItem("token",token);
                apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
            }
            return response;
        }).catch((error: AxiosError<IException>) => {
            throw {
                message: error.response?.data.message || "حدث خطأ ما",
                status: error.response?.status || 500
            };
        });
};

const getCurrentUser = async () : Promise<IUser> => {
    return (await apiClient.get("/auth")).data;
}
const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export default {
    register,
    getCurrentUser,
    login,
    logout,
};
