import {ReactElement} from "react";

interface BadgeProps {
    icon: ReactElement;
    text: string;
    options?: {
        textClass?: string;
        divClass?: string;
    }
}
export default function BadgeComponent(props: BadgeProps)  {

    return (
        <div className={`text-lg flex justify-center items-center h-12 bg-base-300 rounded-md ${(props.options?.divClass) ? props.options?.divClass : "w-52"}`}>
             <h2 className={"font-bold brightness-200 " + props.options?.textClass}>{props.text}</h2>
            <span className="mx-2 h-full  py-2.5">
                <hr className="bg-white w-[2.5px] rounded h-full"/>
            </span>
            <span className={"text-3xl mb-0.5"}>
                {props.icon}
            </span>
        </div>
    );

}
