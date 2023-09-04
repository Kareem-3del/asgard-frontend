import {useEffect, useRef , ComponentState} from "react";

function usePrevious<T>(value : ComponentState) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    },[value]); //this code will run when the value of 'value' changes
    return ref.current as T; //in the end, return the current ref value.
}
export default usePrevious;
