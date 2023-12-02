import {FiUpload, IoCopy} from "react-icons/all";
import React, {useState} from "react";
import {createChapter} from "../../../services/chapter.service";
import {useParams} from "react-router-dom";
import {IManga} from "../../../interfaces/manga.interface";
import {v4 as uuid} from "uuid";
import useToaster from "../../../hooks/toast/useToaster.hook";
import {IChapter} from "../../../interfaces/chapter.interface";
import {AxiosResponse} from "axios";
import {TextEditor} from "../../../components/text-editor/TextEditor.component";

const WriteNovelChapter = ({manga, handleUpload}: { manga: IManga, handleUpload?: (e: IChapter) => void }) => {
    const toaster = useToaster();
    const checkboxRef = React.createRef<HTMLInputElement>()
    const [title, setTitle] = useState<string>();
    const [chapterNumber, setChapterNumber] = useState<number>();
    let chapter_resolve_uuid = uuid();
    const short_link = `${location.host}/short-link/${chapter_resolve_uuid}`
    const [novelContent, setNovelContent] = useState<string>();

    function handleCreateNovelChapter() {
        if (!chapterNumber)
            return toaster.createToast({
                message: "يجب ادخال رقم الفصل",
                type: "warning"
            });
        createChapter(manga.slug, {
            number: chapterNumber,
            title: title,
            content_text: novelContent
        }).then((res: AxiosResponse<IChapter>) => {
            toaster.createToast({
                message: "تم اضافة الفصل بنجاح",
                type: "success"
            });
            if (handleUpload) {
                handleUpload({
                    ...res.data,
                    badge: "الان"
                })
            }
            setChapterNumber((prev) => {
                console.log(prev)
                if (prev)
                    return prev + 1;
                return 1;
            })
            setTitle("");
            checkboxRef.current?.click();

        }).catch(err => {
            console.log(err)
            toaster.createToast({
                message: err.response?.data.message as string || "حدث خطأ اثناء اضافة الفصل",
                type: "error"
            });
        })
    }

    return (
        <>
            <input ref={checkboxRef} type="checkbox" id="write-novel-chapter" className="modal-toggle"/>
            <div className="modal" dir="rtl">
                <div className="modal-box relative w-full max-w-6xl">
                    <label htmlFor="write-novel-chapter"
                           className="btn btn-sm btn-circle absolute left-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">اضافة فصل جديد</h3>
                    <p className="py-4">يرجي ملئ المعلومات المطلوبة</p>
                    <div dir="ltr" className="my-2">
                        <TextEditor onChange={(e) => {
                            setNovelContent(e)
                        }} className=" min-h-[300px]"/>
                    </div>
                    <div className="flex space-y-3 flex-col">
                        <input type="text" onChange={(e) => setTitle(e.currentTarget.value)} placeholder="عنوان الفصل"
                               className="input input-bordered w-full "/>
                        <input type="number" value={chapterNumber}
                               onChange={(e) => setChapterNumber(Number(e.currentTarget.value))}
                               placeholder="رقم الفصل" className="input input-bordered w-full "/>


                        <div tabIndex={10}
                             className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">

                            <input type="checkbox" className="peer"/>
                            <div className="collapse-title text-xl font-medium">
                                تفعيل رابط الاختصار ؟
                            </div>

                            <div className="collapse-content ">
                                <input id="short_link_input"
                                       className="w-full my-2 text-center input border-2 border-base-content/10"
                                       readOnly={true} dir="ltr" value={short_link}/>
                                <div className="flex z-50">
                                    <div className="tooltip" data-tip="نسخ الرابط">
                                        <button className="btn ml-2 " onClick={() => {
                                            const input = document.getElementById("short_link_input") as HTMLInputElement;
                                            input.select();
                                            input.setSelectionRange(0, 99999);
                                            document.execCommand("copy");
                                        }}>

                                            <span className="mr-1 text-xl"><IoCopy/></span>

                                        </button>
                                    </div>

                                    <input type="url" placeholder="رابط الاختصار"
                                           className="input input-bordered w-full"/>
                                </div>
                            </div>


                        </div>
                        <div className="flex justify-center items-center">
                            <button className="btn w-full  btn-primary " onClick={handleCreateNovelChapter}>
                                اضافة الفصل
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default WriteNovelChapter
