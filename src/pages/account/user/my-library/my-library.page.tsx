import {MdNoteAdd} from "@react-icons/all-files/md/MdNoteAdd";
import soloLeveling from "../../../../assets/images/solo-leveling_.png"
import React from "react";
import {AiFillDelete} from "@react-icons/all-files/ai/AiFillDelete";
import {AiFillEdit} from "@react-icons/all-files/ai/AiFillEdit";
import {BiShow} from "@react-icons/all-files/bi/BiShow";
import CreateMangaComponent from "./create-manga/create-manga.component";

const MyLibraryPage = () => {
    return (
        <div className="w-full h-full">


            <div className="flex">
                <div className="w-72 bg-base-200 p-3 flex-none rounded-sm">


                    <label className="btn btn-outline w-full rounded-full" htmlFor="create-manga">

                        اضافة
                        <span className="mr-2 text-2xl mb-0.5"><MdNoteAdd/></span>

                    </label>
                </div>
                <div className="w-full bg-base-200  mr-3 rounded-sm">

                </div>
            </div>
            <div className="bg-base-200 mt-3 rounded-sm p-1 flex w-full">
                <ul className="bg-base-300 w-full p-3 space-y-3 h-full overflow-y-scroll" dir="rtl">

                    <div className="flex justify-center itesm -">
                        لا يوجد اي مانجا (خطا 300)
                    </div>
                </ul>
            </div>

            <input type="checkbox" id="create-manga" className="modal-toggle"/>
            <label htmlFor="create-manga" className="modal cursor-pointer">
                <label className=" relative" htmlFor="">
                    <CreateMangaComponent/>
                </label>
            </label>
        </div>
    );
}

const CardManga = () => {
    return (
        <li className="w-full bg-base-100 h-36 p-2 rounded-md flex">
            <div className="flex flex-none">
                <div className="avatar h-full">
                    <div className="w-28 rounded">
                        <img src={soloLeveling} alt=""/>
                    </div>
                </div>

                <div className="mr-2 flex flex-col justify-center space-y-1">
                    <h1 className="text-3xl font-semibold">SOLO LEVELING HEIGHT CLASS S2</h1>
                    <h2>

                        عدد الفصول :
                        <span className="text-accent"> 12</span>
                    </h2>
                    <h2>

                        تاريخ الاضافة :
                        <span className="text-accent">12/20/2020</span>
                    </h2>
                    <div className="space-x-1" dir="ltr">
                        <div className="badge">اكشن</div>
                        <div className="badge">مغامرات</div>
                        <div className="badge">قتال</div>
                        <div className="badge">رومانسي</div>
                    </div>

                </div>

            </div>
            <div className="flex text-3xl space-x-3 mr-auto h-full justify-center items-center w-full"
                 dir="ltr">
                <button className="btn text-2xl btn-info  btn-circle">
                    <AiFillEdit/>
                </button>
                <button className="btn text-2xl btn-error  btn-circle">
                    <AiFillDelete/>
                </button>
                <button className="btn text-2xl btn-primary  btn-circle">
                    <BiShow/>
                </button>
            </div>
        </li>
    );
}
export default MyLibraryPage;
