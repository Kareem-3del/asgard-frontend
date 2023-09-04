import {IGenre} from "../../../../interfaces/genre.interface";
import React from "react";
import {MdCreateNewFolder} from "@react-icons/all-files/md/MdCreateNewFolder";
import genreService from "../../../../services/genre.service"
import {AxiosError, AxiosResponse} from "axios";
import useToaster from "../../../../hooks/toast/useToaster.hook";
import {IException} from "../../../../interfaces/exception.interface";
interface IGenresListProps {
    genres: IGenre[],
    editGenres: (genres: IGenre[]) => void,
}

const ControlGenres = ({genres, editGenres}: IGenresListProps) => {
    const {createToast} = useToaster()
    const [name, setName] = React.useState<string>("")
    const createGenre = async () => {
        if(name.length > 0){
            genreService.newOne(name).then((res:AxiosResponse<IGenre>)=>{
                editGenres([...genres, res.data])
                createToast({
                    message: "تم اضافة التصنيف بنجاح",
                    type: "success"
                })
                setName("")
            }).catch((err:AxiosError<IException>)=>{
                createToast({
                    message: err.response?.data.message[0] || "حدث خطأ ما",
                    type: "error"
                })
            })
        }else {
            createToast({
                message: "الرجاء ادخال اسم التصنيف",
                type: "warning"
            })
        }
    }
    return (
        <div className="w-full  shadow  mb-3 flex  items-center p-3 rounded">

            <label  htmlFor="create-genre" className="btn btn-info btn-wide text-xl h-16">
                جديد
                <span className="mr-2"><MdCreateNewFolder/></span>
            </label>
            <div className="stat  w-fit rounded mr-3 ">
                <div className="stat-title">عدد التصنيفات</div>
                <div className="stat-value  ">{genres.length}</div>
            </div>

            <input type="checkbox" id="create-genre" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-lg">إنشاء تصنيف جديد</h3>
                    <input type="text" onChange={(event)=>{setName(event.currentTarget.value)}} placeholder="اسم التصنيف" className="input input-bordered input-md w-full text-center mt-3"/>
                    <div className="modal-action" dir="ltr">
                        <label htmlFor="create-genre" className="btn ">إلغاء</label>
                        <button className="btn btn-primary btn-wide" onClick={createGenre}>انشاء</button>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default ControlGenres;
