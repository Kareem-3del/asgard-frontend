import {IToast} from "../../interfaces/toast.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    lastId: 0,
    toasts: [] as IToast[],
}

const toastReducer = createSlice({

    name: "toast",
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<IToast>) => {
            action.payload.id = state.lastId;
            state.lastId++;
            state.toasts.push(action.payload);
        },
        removeToast: (state, action: PayloadAction<number>) => {
            state.toasts.map((toast, index) => {
                if (toast.id === action.payload) {
                    state.toasts[index].animation_ = "out";
                }
            })
        },

        deleteToast: (state, action: PayloadAction<number>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        }
    }
})

export const {addToast, removeToast, deleteToast} = toastReducer.actions;
export default toastReducer.reducer
