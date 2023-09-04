import {useAppSelector} from "../redux";

export const useAuth = () => {
    const {user, isLoading, isLogin} = useAppSelector(state => state.auth)
    return {
        user, isLoading, isLogin
    }
}
export default useAuth
