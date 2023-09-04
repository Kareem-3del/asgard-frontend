import {ReactElement, ReactNode} from "react";
import {redirect} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

const ProtectedRoute = ({ children , reflect } : {children : ReactElement , reflect? : boolean}) => {
    const {isLogin} = useAppSelector(((state) => state.auth));
    if(reflect && isLogin){
        redirect("/")
    }
    if (!reflect && !isLogin) {
        redirect("/auth/login")
    }
    return children;
}

export default ProtectedRoute;
