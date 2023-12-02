
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import "./text-editor.scss"
export const TextEditor = ({onChange , className}:{onChange:(text:string)=>void , className:string})=>{
    const [value, setValue] = useState('');

    return(
        <div className={`p-1 bg-base-300 ${className}`}>
            <ReactQuill placeholder="اكتب هنا.."  theme="snow" value={value} onChange={(v)=>{
                setValue(v)
                onChange(v);
                console.log(value)
            }} />
        </div>
    )
}