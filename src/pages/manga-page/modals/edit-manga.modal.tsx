import React from "react";
import {IManga} from "../../../interfaces/manga.interface";
import useManga from "../../../hooks/manga/useManga.hook";
import useToaster from "../../../hooks/toast/useToaster.hook";
import {FiEdit3} from "react-icons/all";
import {DetailsManga} from "../../account/user/my-library/create-manga/create-manga.component";

const EditMangaModal = ({manga}: { manga: IManga }) => {
    const {editManga} = useManga();
    const [mangaEdit, setMangaEdit] = React.useState<IManga & { edited_genres: number[], edited_status: string, edited_type: string }>({...manga, edited_genres: manga.genres.map(e => e.id), edited_status: String(manga.status), edited_type: String(manga.type)});
    const [background, setBackground] = React.useState<File>();
    const [cover, setCover] = React.useState<File>();

    const handleEditManga = () => {
        editManga(manga.id, {
            title: mangaEdit.title,
            story: mangaEdit.story,
            genres: mangaEdit.edited_genres,
            status: mangaEdit.edited_status,
            type: mangaEdit.edited_type,
            background: background,
            cover: cover
        }).then(res => {
            console.log("sent edit manga request [Success]",res);
        }).catch(err => {
            console.log("sent edit manga request [Failed]",err);
        })

    }
    return (
        <>
            <input type="checkbox" id="edit-manga" className="modal-toggle"/>
            <div className="modal" dir="rtl">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl flex">
                        تعديل
                        <span className="mr-2"><FiEdit3/></span>
                    </h3>
                    <p className="py-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">اسم المانجا</span>
                            </label>
                            <input type="text" onChange={(e)=>{
                                setMangaEdit({...mangaEdit,title:e.currentTarget.value})
                            }} defaultValue={manga.title} className="input input-bordered w-full"/>
                        </div>
                        <label className="label">
                            <span className="label-text">قصة</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24 w-full"
                                    onChange={(e) => {
                                        setMangaEdit({...mangaEdit,story:e.currentTarget.value})
                                    }}
                                  defaultValue={manga.story}></textarea>
                        <DetailsManga genres={mangaEdit.edited_genres} status={String(manga.status)}
                                      callback={(type, status, genres) => {
                                          setMangaEdit({
                                              ...mangaEdit,
                                              edited_genres: genres,
                                              edited_status: status,
                                              edited_type: type
                                          })
                                      }}/>


                        <div dir="ltr" className="flex items-center justify-center flex-col">
                            <label className="label">
                                <span className="label-text">صورة المانجا</span>
                            </label>
                            <input type="file" accept="image/*"
                                   onChange={(e) => {
                                       if (e.currentTarget.files) {
                                           setCover(e.currentTarget.files[0])
                                       }}
                                   }
                                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"/>
                        </div>
                        <div dir="ltr" className="flex items-center justify-center flex-col">
                            <label className="label">
                                <span className="label-text">صورة الغلاف</span>
                            </label>
                            <input type="file" accept="image/*"
                                   onChange={(e) => {
                                       if (e.currentTarget.files) {
                                           setBackground(e.currentTarget.files[0])
                                       }}
                                   }
                                   className="file-input file-input-bordered file-input-primary w-full max-w-xs"/>

                        </div>
                    </p>
                    <div className="modal-action ">
                        <button className="btn btn-primary ml-2" onClick={handleEditManga}> حفظ</button>
                        <label htmlFor="edit-manga" className="btn ">إلغاء</label>
                    </div>
                </div>
            </div>
        </>
    )
}


export default EditMangaModal
