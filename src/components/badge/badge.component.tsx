import {ReactElement} from "react";

interface BadgeProps {
    icon: ReactElement;
    text: string;
    options?: {
        textClass?: string;
        divClass?: string;
    }
}

export default function BadgeComponent(props: BadgeProps) {

    return (
        <div className="flex justify-center items-center">
            <div
                className={`text-lg flex justify-center items-center h-12 bg-base-300 rounded-md rounded-r-sm px-4${(props.options?.divClass) ? props.options?.divClass : ""}`}>
                <h2 className={"font-bold brightness-200 " + props.options?.textClass}>{props.text}</h2>
                {/*    <span className="mx-2 h-full  py-2.5">
                <hr className="bg-primary w-1 rounded h-full border-0"/>
            </span>*/}

            </div>
            <div className="bg-base-300 h-12 flex justify-center items-center px-3 ml-1 rounded-md  rounded-l-sm">
              <span className="text-3xl mb-0.5 text-white">
                    {props.icon}
              </span>
            </div>
        </div>
    );

}
