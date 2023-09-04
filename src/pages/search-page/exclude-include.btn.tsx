import {useState} from "react";

interface Props {
    className?: string
    content: string
    onClick: (value: "included" | "excluded" | "none") => void
}

export const ExcludeIncludeBtn = (props: Props) => {
    const [state, setState] = useState<"included" | "excluded" | "none">("none")
    return (
        <button className={`btn btn-sm m-1 ${
            state === "none" ? "" : state === "included" ? "btn-success" : "btn-error"
        } ${props.className || ""}`}
                onClick={() => {
                    if (state === "none") {
                        setState("included")
                        props.onClick("included")
                    } else if (state === "included") {
                        setState("excluded")
                        props.onClick("excluded")
                    } else if (state === "excluded") {
                        setState("none")
                        props.onClick("none")
                    }
                }}
        >
            {props.content}
        </button>
    )
}
