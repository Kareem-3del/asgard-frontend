import {FiUpload, IoCopy} from "react-icons/all";
import React, {useState} from "react";
import {createChapter} from "../../../services/chapter.service";
import {useParams} from "react-router-dom";
import {IManga} from "../../../interfaces/manga.interface";
import {v4 as uuid} from "uuid";

const UploadChapterModal = ({manga}: { manga: IManga }) => {

    const fileInput = React.createRef<HTMLInputElement>()
    const [selectedFile, setSelectedFile] = useState<File>();
    const [fileName, setFileName] = useState("لم يتم اختيار ملف")
    const [title, setTitle] = useState<string>();
    const [chapterNumber, setChapterNumber] = useState<number>();
    let chapter_resolve_uuid = uuid();
    const short_link = `${location.host}/short-link/${chapter_resolve_uuid}`
    const uploadChapter = () => {
        if (!chapterNumber)
            return alert("يجب ادخال رقم الفصل")
        if (selectedFile) {
            createChapter(manga.slug, {
                number: chapterNumber,
                title: title,
                zipFile: selectedFile
            }).then(res => {
                alert("تم رفع الفصل بنجاح")
                console.log(res);
            })
        }

    }
    return (
        <>
            <input type="checkbox" id="upload-chapter" className="modal-toggle"/>
            <div className="modal" dir="rtl">
                <div className="modal-box relative">
                    <label htmlFor="upload-chapter" className="btn btn-sm btn-circle absolute left-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">اضافة فصل جديد
                        <span className="text-xs mr-2 text-neutral-content/50">('{fileName}')</span>


                    </h3>
                    <p className="py-4">يرجي ملئ المعلومات المطلوبة</p>
                    <div className="flex space-y-3 flex-col">
                        <input type="text" onChange={(e) => setTitle(e.currentTarget.value)} placeholder="عنوان الفصل"
                               className="input input-bordered w-full "/>
                        <input type="number" onChange={(e) => setChapterNumber(Number(e.currentTarget.value))}
                               placeholder="رقم الفصل" className="input input-bordered w-full "/>


                        <div tabIndex={10}
                             className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">

                            <input type="checkbox" className="peer"/>
                            <div className="collapse-title text-xl font-medium">
                                تفعيل رابط الاختصار ؟
                            </div>

                            <div className="collapse-content ">
                                <input id="short_link_input" className="w-full my-2 text-center input border-2 border-base-content/10" readOnly={true} dir="ltr" value={short_link}/>
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


                        <label className="btn ">
                            <input type="file" ref={fileInput} accept="application/zip" multiple={false}
                                   onChange={(e) => {
                                       setFileName(e.target.value)
                                       if (e.currentTarget.files && e.currentTarget.files[0]) {
                                           setSelectedFile(e.currentTarget.files[0])
                                       }
                                   }}
                                   hidden/>
                            اختيار الملف
                            <span className="text-xl mb-1 mr-2">
                                    <FiUpload/>
                                </span>
                        </label>

                        <div className="flex justify-center items-center">
                            <button className="btn w-full  btn-primary " onClick={uploadChapter}>
                                رفع الفصل
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default UploadChapterModal
