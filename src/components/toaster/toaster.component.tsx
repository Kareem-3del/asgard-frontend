import React, {useEffect} from "react";
import {deleteToast, removeToast} from "../../reducers/toast/toast.reducer";
import store from "../../store";
import {useAppSelector} from "../../hooks/redux";
import {IToast} from "../../interfaces/toast.interface";
import {motion} from "framer-motion";
import {BsCheckCircleFill, GiDeadWood, MdOutlineError} from "react-icons/all";
import {BsFillInfoCircleFill} from "@react-icons/all-files/bs/BsFillInfoCircleFill";
import {TiWarning} from "@react-icons/all-files/ti/TiWarning";


const ToasterComponent = () => {
    function reverseArr(input: any[]) {
        let ret = [];
        for (let i = input.length - 1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    }


    const {toasts} = useAppSelector(state => state.toast);
    useEffect(() => {
        return () => {
            toasts.forEach((toast: IToast) => {
                setTimeout(() => {
                    store.dispatch(removeToast(toast.id as number));
                }, toast.duration || 3000);
            });
        }
    }, [toasts]);

    return (
        <div
            className="fixed bottom-0 py-3 right-0 space-y-3 h-fit z-[500] max-h-[100vh] overflow-x-hidden overflow-y-scroll">

            {
                reverseArr(toasts).map((item) => (
                    ToastCard(item)
                ))
            }
        </div>

    );
}

const ToastCard = (toast: IToast) => {
    return (
        <motion.div
            dir="rtl"
            animate={toast.animation_ || "in"}
            initial="initial"
            variants={{
                initial: {opacity: 0, x: 500, y: 0},
                in: {opacity: 1, x: 0, y: 0},
                out: {opacity: 0, x: 500, y: 0},
            }}
            onAnimationComplete={() => {
                if (toast.animation_ && toast.animation_ == "out") {
                    store.dispatch(deleteToast(((toast.id) as number)))
                }
            }}
            transition={{type: "tween", ease: "easeInOut", duration: 0.5}}
            className={`md:w-96 bg-${toast.type}  flex px-3 py-2 mt-1 rounded-l w-80 items-center`}
            key={toast.id}>
            <div className={`justify-center flex items-center text-4xl text-${toast.type}-content`}>
                <IconToast type={toast.type}/>
            </div>
            <div className={`mr-2 text-error-content ml-1 `+ ` text-${toast.type}-content`}>

                {
                    (toast.title) ? <>
                        <h1 className={`font-semibold`}>{toast.title}</h1>
                        <p className="text-xs line-clamp-2">{toast.message}</p>
                    </> : <p className="font-semibold">{toast.message}</p>
                }
            </div>
            <div className="mr-auto">
                {
                    <button className="btn-sm btn rounded-sm"
                            onClick={() => {
                                if (toast.btnCallback) {
                                    toast.btnCallback(toast);
                                } else {
                                    store.dispatch(removeToast((toast.id) as number))
                                }
                            }}>
                        {
                            (toast.btnText) ? toast.btnText : "الغاء"
                        }
                    </button>
                }
                {toast.btnComponent && <toast.btnComponent/>}
            </div>
        </motion.div>
    )
}


const IconToast = (props: { type: string }) => {
    switch (props.type) {
        case "error":
            return <MdOutlineError/>
        case "warning":
            return <TiWarning/>
        case "success":
            return <BsCheckCircleFill/>
        case "info":
            return <BsFillInfoCircleFill/>

        default:
            return <GiDeadWood/>
    }
}

export default ToasterComponent;
