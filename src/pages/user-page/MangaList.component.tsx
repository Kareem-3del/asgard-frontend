import React from "react";
import {IManga} from "../../interfaces/manga.interface";
import MangaSlideCardV3 from "../manga-page/manga-slider/manga-slide.card";
const MangaListComponent = ({manga}:{manga?:IManga[]}) => {
    return (
        <React.Fragment>
            <div className="">
                <ul className="overflow-y-scroll     md:max-h-[440px] grid justify-center  xl:grid-cols-3 gap-4 p-1">
                    {
                        manga?.map((manga, index) => <li key={index} dir="ltr" className="flex justify-center items-center"><MangaSlideCardV3 className="!bg-base-100" manga={manga}/></li>)
                    }
                </ul>
                {
                    (manga?.length == 0) && <div className="flex justify-center items-center h-[440px]">
                        <h1 className="text-2xl">لا يوجد اعمال</h1>
                    </div>
                }
            </div>
        </React.Fragment>
    );

}


export default MangaListComponent;
