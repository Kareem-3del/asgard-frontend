import React from "react";
import store from "../../store";
import {logoutThunk} from "../../reducers/auth/actions/auth.actions";
import {addToast} from "../../reducers/toast/toast.reducer";

const LogoutComponent = () => {
    store.dispatch(logoutThunk()).then(() => {
        store.dispatch(addToast({
            title: "تسجيل الخروج",
            message: "لقد تم تسجيل الخروج بنجاح",
            type: "info",
            duration: 5000
        }))
    });
    // back to previous page or home page
    setTimeout(() => {
        if (window.history.state === null) {
            window.location.href = "/"
        }
        window.history.back();
    }, 1000);
    return (<div dir="rtl" className="w-full flex text-center text-4xl justify-center items-center h-96">
        <h1>جاري تسجيل الخروج......</h1>
    </div>);
}

export default LogoutComponent;
