import {FC} from "react";

export interface IToast {
    id?: number;
    message: string,
    type: "success" | "error" | "info" | "warning",
    duration?: number,
    btnComponent?: FC,
    btnCallback?: (toast: IToast) => void,
    title?: string,
    btnText?: string,
    hideCloseBtn?: boolean,
    closeBtn?: boolean,
    animation?: "fade" | "slide",
    animation_?: "in" | "out" | "up" | "normal",
}
