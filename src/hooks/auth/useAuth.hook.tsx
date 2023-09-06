import {useAppSelector} from "../redux";
import {IUser} from "../../interfaces/user.interface";
import {useDispatch} from "react-redux";
import {updateUser} from "../../reducers/auth/actions/auth.actions";

export const useAuth = () => {
    const {user, isLoading, isLogin} = useAppSelector(state => state.auth)
    function update(user:Partial<IUser>) {
        updateUser(user)
    }

    return {
        user, isLoading, isLogin , update
    }
}
export default useAuth
