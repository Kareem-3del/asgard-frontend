import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "../reducers";

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
