// create root reducer

import {combineReducers} from "redux";
import authReducer from "./auth/auth.reducer";
import toastReducer from "./toast/toast.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
});
export default rootReducer
