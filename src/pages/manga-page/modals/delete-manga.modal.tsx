import React from "react";
import {IManga} from "../../../interfaces/manga.interface";
import useManga from "../../../hooks/manga/useManga.hook";
import useToaster from "../../../hooks/toast/useToaster.hook";
import {AxiosError} from "axios";

const DeleteMangaModal = ({manga}:{manga: IManga}) => {
    const {deleteManga} = useManga();
    const toaster = useToaster();
    return (
        <>
            <input type="checkbox" id="delete-manga" className="modal-toggle"/>
            <div className="modal" dir="rtl">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl">هل انت متاكد من حذف العمل؟</h3>
                    <p className="py-4">سوف يتم حذف هذا العمل و لن يظهر للمتابعين مره اخري
                        هذا القرار لا يمكن التراجع عنه و انت مسؤول عنه

                    </p>
                    <p>
                        <span className="font-bold ml-1"> ملاحظة :</span>
                        لا يمكن حذف العمل اذا كان يحتوي علي فصول
                    </p>
                    <div className="modal-action ">
                        <button disabled={!!manga.chapters.length} onClick={()=>{
                            deleteManga(manga.id).then(()=> {
                                toaster.createToast({
                                    message: "تم حذف العمل بنجاح",
                                    type: 'success'
                                });
                            }).catch((e:AxiosError<any>)=>{
                                toaster.createToast({
                                    message: e.response?.data.message || "حدث خطأ",
                                    type: 'error'
                                });
                            });
                        }} className="btn btn-error ml-2"> تاكيد </button>
                        <label htmlFor="delete-manga" className="btn ">إلغاء</label>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DeleteMangaModal
