import {IUser} from "../../interfaces/user.interface";
import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUserThunk, loginThunk, logoutThunk} from "./actions/auth.actions";
import {AxiosResponse} from "axios";
const initialState = {
    user: {} as IUser | null,
    isLoading: true as boolean,
    isLogin: false as boolean,
}


const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {


        builder.addCase(getUserThunk.pending, (state : typeof initialState) => {
            state.isLoading = true
        })

        builder.addCase(getUserThunk.fulfilled, (state, {payload}: PayloadAction<IUser>  ) => {
            console.log(payload)
            state.isLoading = false
            if (payload.id) {
                state.isLogin = true
                state.user = payload
            }
        })

        builder.addCase(getUserThunk.rejected, (state) => {
            state.isLoading = false
            state.isLogin = false
            state.user = null
        })



        // Sign IN

        builder.addCase(loginThunk.pending, (state) => {
            state.isLoading = true
        })


        builder.addCase(loginThunk.fulfilled, (state, {payload}  ) => {
            state.isLoading = false;
            if (payload.id) {
                state.isLogin = true
                state.user = payload
            }
        })


        builder.addCase(loginThunk.rejected, (state) => {
            state.isLoading = false;
            state.isLogin = false;
            state.user = null
            logoutThunk()
        })



        // LogOut



        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.isLogin = false;
            state.user = null;
        })


    }
})

export default authReducer.reducer
