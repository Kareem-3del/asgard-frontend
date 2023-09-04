import {IGenre} from "../../../../interfaces/genre.interface";
import {getArStringFromTime} from "../../../../utils/time.helper";
import React, {useEffect} from "react";
import genreService from "../../../../services/genre.service";
import {Axios, AxiosError, AxiosResponse} from "axios";
import {IException} from "../../../../interfaces/exception.interface";
import useToaster from "../../../../hooks/toast/useToaster.hook";

interface IGenresListProps {
    genres: IGenre[],
    deleteFC: (genre: IGenre) => void,
    editFC: (genre: IGenre) => void,
}

const GenresList = ({genres, deleteFC, editFC}: IGenresListProps) => {
    const {createToast} = useToaster();
    const [genre, setGenre] = React.useState<IGenre | null>(null)

    const deleteGenre = () => {
        if (!genre) {
            alert('تصرف غير معروف');
            return;
        }
        genreService.deleteOne(genre.id).then((res: AxiosResponse<IException>) => {
            deleteFC(genre)
            createToast({
                title: "Genre Deleted",
                message: res.data.message as string || "Genre Deleted Successfully",
                type: "success",
                duration: 5000
            })

        }).catch((err: AxiosError<IException>) => {
            createToast({
                title: "خطأ",
                message: err.response?.data.message as string || "حدق مشكلة ما",
                type: "error",
                duration: 5000
            })
        });
    }

    const editGenre = () => {
        if (!genre) {
            return;
        }
        genreService.updateOne(genre?.id, genre?.name).then((res: AxiosResponse<IException>) => {
            setGenre(null)
            editFC(genre)
            createToast({
                title: "Success",
                message: res.data.message as string || "Genre updated successfully",
                type: "success",
                duration: 5000,
            })

        }).catch((err: AxiosError<IException>) => {
            createToast({
                title: "Error",
                message: err.response?.data.message as string || "حدث خطأ ما",
                type: "error",
                duration: 5000
            })
        });
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full text-right ">
                <thead>
                <tr>
                    <th>#</th>
                    <th>الاسم</th>
                    <th>تاريخ</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {
                    genres.map(genre => {
                        return (
                            <tr className="odd:bg-white even:bg-slate-50 odd:active">
                                <th>{genre.id}</th>
                                <td>{genre.name}</td>
                                <td dir="rtl"> {getArStringFromTime(genre.age)}</td>

                                <td>
                                    <label htmlFor="edit-genre" onClick={() => {
                                        setGenre(genre)
                                    }} className="btn btn-sm w-full btn-info">تعديل</label>
                                </td>
                                <td>
                                    <label htmlFor="delete-genre" onClick={() => {
                                        setGenre(genre)
                                    }} className="btn btn-sm w-full btn-error">حذف</label>
                                </td>

                            </tr>
                        )
                    })
                }
                {
                    genres.length === 0 &&
                    <tr className="active ">
                        <td colSpan={5}>
                            لا يوجد تصنيفات <label htmlFor="create-genre" className="text-accent text-xs underline">اضف
                            البعض</label>
                        </td>
                    </tr>
                }
                </tbody>
            </table>

            <input type="checkbox" id="edit-genre" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">تعديل التصنيف </h3>
                    <input type="text" onChange={(event)=>{
                        if(genre){
                            genre.name = (event.target as HTMLInputElement).value
                        }
                    }} defaultValue={genre?.name} placeholder="اسم التصنيف"
                           className="input input-bordered input-md w-full text-center mt-3"/>
                    <div className="modal-action" dir="ltr">
                        <label htmlFor="edit-genre" className="btn ">إلغاء</label>
                        <button className="btn btn-info btn-wide" onClick={editGenre}>تعديل</button>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="delete-genre" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">حذف التصنيف</h3>
                    <p className="text-center">هل انت متأكد من حذف التصنيف <span
                        className="text-error">{genre?.name}</span>؟</p>
                    <div className="modal-action" dir="ltr">
                        <label htmlFor="delete-genre" className="btn ">إلغاء</label>
                        <button onClick={deleteGenre} className="btn btn-error btn-wide">حذف</button>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default GenresList;
