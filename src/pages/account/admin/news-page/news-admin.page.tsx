import React, {ChangeEvent, useRef} from 'react';
import "./editor.scss"
import EmailEditor, {EmailEditorProps, UnlayerOptions} from 'react-email-editor';
import Component from "react-email-editor";
import {createNews} from "../../../../services/news.service";
import useToaster from "../../../../hooks/toast/useToaster.hook";

export function NewsAdminPage() {
    const emailEditorRef = useRef<any>()
    const [image, setImage] = React.useState<string | ArrayBuffer>()
    const [title, setTitle] = React.useState<string>("")


    const toaster = useToaster()

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files?.[0]) return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target?.result)
            if (e.target?.result)
                setImage(e.target?.result)
        }
        reader.readAsDataURL(file);
    }


    const exportHtml = () => {
        if (!title)
            return toaster.createToast({
                title: "خطأ",
                message: "الرجاء ادخال عنوان",
                type: "error"
            })

        if (!image)
            return toaster.createToast({
                title: "خطأ",
                message: "الرجاء ادخال صورة",
                type: "error"
            })

        if (emailEditorRef.current) {
            const {exportHtml} = emailEditorRef.current as Component
            exportHtml((data) => {
                const {design, html} = data;
                createNews({
                    title,
                    content: html,
                    image,
                }).then(() => {
                    toaster.createToast({
                        title: "تم",
                        message: "تم اضافة الخبر بنجاح",
                        type: "success"
                    })
                }).catch(() => {
                    toaster.createToast({
                        title: "خطأ",
                        message: "حدث خطأ ما",
                        type: "error"
                    })
                });
            });
        }
    };

    const onReady = () => {
        // editor is ready
        console.log('onReady');
    };

    return (
        <div className="w-full">

            <div className="m-5">
                <div className="form-control">
                    <label className="input-group">
                        <input type="text" onChange={(e) => {
                            setTitle(e.target.value)
                        }} placeholder="العنوان" className="input input-bordered w-full max-w-lg"/>

                        <input type="file" className="file-input w-full max-w-xs" onChange={onChangeInput} accept="image/*"/>
                    </label>
                    <label className="label">
                        <button className="btn btn-primary btn-wide rounded-sm" onClick={exportHtml}>نشر</button>
                    </label>
                </div>

            </div>
            <EmailEditor
                style={{
                    height: '100vh',
                    width: '100%'
                }}
                options={{
                    appearance: {
                        theme: 'dark',
                    },

                }}
                ref={emailEditorRef} onReady={onReady}/>


        </div>
    );
}

