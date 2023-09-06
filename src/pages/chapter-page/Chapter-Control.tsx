import {IChapter} from "../../interfaces/chapter.interface";
import {useShortLink} from "../../hooks/useShortLink";
import React, {useEffect, useState} from "react";
import {IShortLink} from "../../interfaces/short-link.interface";
import {AiFillDelete, AiFillEdit, GrPrevious} from "react-icons/all";
import {v4 as uuid} from 'uuid';
import useToaster from "../../hooks/toast/useToaster.hook";
import {deleteChapter} from "../../services/chapter.service";
import {AxiosError, AxiosResponse} from "axios";
import {IException} from "../../interfaces/exception.interface";
import {useNavigate} from "react-router-dom";
const toaster = useToaster();


const DeleteChapterModal = (props: { chapter: IChapter }) => {
    const Navigate = useNavigate();
    const handleDeleteChapter = () => {
        deleteChapter(props.chapter.id).then((res: AxiosResponse<IException>) => {
            toaster.createToast({
                message: res.data.message as string,
                type: "success"
            });
            // delete last parm from url

            let url = window.location.pathname.split("/");
            url.pop();
             Navigate(url.join("/"));
        }).catch((err: AxiosError<IException>) => {
            toaster.createToast({
                message: err.response?.data.message as string || err.message,
                type: "error"
            });
        });
    }


    return (
        <>
            <input type="checkbox" id="delete-chapter" className="modal-toggle"/>
            <div className="modal" dir="rtl">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error text-center">
                        هل انت متأكد من حذف الفصل <span>{props.chapter.number}</span> ؟
                    </h3>
                    <div className="modal-action" dir="ltr">
                        <label htmlFor="delete-chapter" className="btn">الغاء</label>
                        <button
                            onClick={handleDeleteChapter}
                            className="btn btn-error">حذف
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

const EditChapterModal = (props: { chapter: IChapter }) => {
    const [shortLink, setShortLink] = useState<IShortLink>(props.chapter.short_link || null);
    let chapter_resolve_uuid = uuid();
    const [chapterTitle, setChapterTitle] = useState<string>("");
    const [chapterNumber, setChapterNumber] = useState<number>(0);

    const {createShortLink, editShortLink} = useShortLink();
    useEffect(() => {
        setChapterNumber(props.chapter.number)
        setChapterTitle(props.chapter.title)
        if (props.chapter.short_link) {
            setShortLink(props.chapter.short_link)
        }
    }, [])
    const handleSaveShortLink = () => {
        if (props.chapter.short_link) {
            editShortLink(props.chapter.short_link.id, shortLink.redirect_url).then(() => {
                toaster.createToast({
                    message: "تم تعديل  رابط الاختصار بنجاح",
                    type: 'success'
                })
            });
            return;
        }
        createShortLink(props.chapter.id, chapter_resolve_uuid, shortLink.redirect_url).then((shortLink) => {
            toaster.createToast({
                message: "تم انشاء رابط اختصار بنجاح",
                type: 'success'
            });
            setShortLink(shortLink);
        });
    }


    return (
        <>
            <input type="checkbox" id="edit-chapter" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        تعديل الفصل
                    </h3>
                    <div>
                        <div className="form-control w-full" dir="rtl">
                            <label className="label">
                                <span className="label-text-alt">عنوان الفصل</span>
                            </label>
                            <input type="text" onChange={(e) => {
                                setChapterTitle(e.currentTarget.value)
                            }} defaultValue={props.chapter.title} placeholder="لا يوجد عنوان للفصل"
                                   className="input input-primary w-full text-center"/>
                        </div>
                        <div className="form-control w-full" dir="rtl">
                            <label className="label">
                                <span className="label-text-alt">رقم الفصل</span>
                            </label>
                            <input type="number" defaultValue={props.chapter.number} placeholder="رقم الفصل"
                                   onChange={(e) => {
                                       setChapterNumber(parseInt(e.currentTarget.value))
                                   }}
                                   className="input input-primary w-full text-center"/>
                        </div>
                        <div className="form-control w-full" dir="rtl">
                            <label className="label">
                                <span className="label-text-alt">رابط الاختصار</span>
                            </label>
                            <input readOnly={true} className="kbd mb-2 text-center outline-0"
                                   value={`${location.host}/short-link/${chapter_resolve_uuid}`} dir="ltr" type="text"
                                   onClick={(event) => {
                                       event.currentTarget.select();
                                       event.currentTarget.setSelectionRange(0, 99999);
                                       document.execCommand("copy");
                                   }}/>
                            <div className="w-full flex">
                                <input type="text"
                                       onChange={(event) => {
                                           setShortLink({...shortLink, redirect_url: event.currentTarget.value});
                                       }}
                                       defaultValue={shortLink?.redirect_url} placeholder="رابط الاختصار"
                                       className="input input-primary w-full text-center"/>
                                <button onClick={handleSaveShortLink} className="btn">حفظ</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="edit-chapter" className="btn">الغاء</label>
                        <button className="btn btn-info">حفظ</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const ChapterControl = ({chapter}: { chapter: IChapter }) => {
    return (
        <div>
            <label htmlFor="edit-chapter" className='btn w-12 h-12 btn-info mr-2'> <AiFillEdit/> </label>
            <label htmlFor="delete-chapter" className='btn w-12 h-12 btn-error'> <AiFillDelete/> </label>

            <DeleteChapterModal chapter={chapter}/>
            <EditChapterModal chapter={chapter}/>
        </div>
    )
}
export default ChapterControl
