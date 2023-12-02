import {apiClient} from "../api/apiConfig";
import {AxiosError, AxiosResponse} from "axios";
import {ILogin, IUser} from "../interfaces/user.interface";
import {IException} from "../interfaces/exception.interface";
import {INotification} from "../interfaces/notification.interface";

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

const getNotifications = async ():Promise<INotification[]> => {
    return (await apiClient.get("/notifications")).data;
}
const deleteNotification = async (notificationId: number) => {
    return (await apiClient.delete(`/notifications/${notificationId}`)).data;
}
const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}


const updateUserInfo = (data: Partial<IUser>) => {
    return apiClient.put(`/users/me`, data);
}

const changeAvatar = (avatar: File) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    return apiClient.put(`/users/me/avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const changeCover = (cover: File) => {
    const formData = new FormData();
    formData.append("cover", cover);
    return apiClient.put(`/users/me/cover`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default {
    register,
    getCurrentUser,
    login,
    logout,
    updateUserInfo,
    changeAvatar,
    changeCover,
    getNotifications,
    deleteNotification
};
