import {addToast} from "../../reducers/toast/toast.reducer";
import store from "../../store";
import {IToast} from "../../interfaces/toast.interface";

const useToaster = () => {
    const createToast = (toast: IToast) => {
        store.dispatch(addToast(toast))
    }
    return {createToast}
}
export default useToaster
