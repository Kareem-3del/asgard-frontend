import AuthService from "../../../services/auth.service";
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {ILogin, IUser} from "../../../interfaces/user.interface";
import {IException} from "../../../interfaces/exception.interface";
interface ISign {
    email: string;
    password: string;
}
interface IRegister {
    email: string;
    password: string;
    username: string;
}
export const loginThunk = createAsyncThunk("auth/login", async (loginData: ISign, {rejectWithValue}) => {
    try {
        const login  = await AuthService.login(loginData.email, loginData.password) as AxiosResponse<{user : IUser, login : ILogin}>;
        return login.data.user;
    } catch (error : any) {
        error = error as AxiosResponse<IException>;
        return rejectWithValue(error as IException);
    }
});

export const updateUser = createAction("auth/update",  (data: Partial<IUser>) => {
    return {
        payload: data,
    };
});

export const registerThunk = createAsyncThunk("auth/register", async (registerData: IRegister, {rejectWithValue}) => {
    try {
        const register  = await AuthService.register(registerData.username,registerData.email, registerData.password) as AxiosResponse<IUser>;
        if(register.status === 201) {
            await AuthService.login(registerData.email, registerData.password);
        }
        return register.data;
    } catch (error : any) {
        error = error as AxiosResponse<IException>;
        return rejectWithValue(error as IException);
    }
});

export const getUserThunk = createAsyncThunk("auth", async (payload, {rejectWithValue}) => {
    try {
        const user   = await AuthService.getCurrentUser() as IUser extends {bought_chapters_ids : number[]} ? IUser : IUser & {bought_chapters_ids : number[]};
        // save chapters bought in local storage get locked chapters and convert to json to read the array
        const chapters_locked = JSON.parse(localStorage.getItem("chapters_locked") || "[]") as number[];
        // save chapters bought in local storage get locked chapters and convert to json to read the array without duplicates
        localStorage.setItem("chapters_locked", JSON.stringify([...new Set([...chapters_locked, ...user.bought_chapters_ids])]));
        return user
    } catch (error) {
        return rejectWithValue(error);
    }
});



export const logoutThunk = createAsyncThunk("auth/logout", () => {
    return AuthService.logout();
});

