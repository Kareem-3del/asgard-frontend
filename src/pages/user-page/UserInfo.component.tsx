import {BsInfoSquareFill} from "@react-icons/all-files/bs/BsInfoSquareFill";
import NotProvidedComponent from "./NotProvided.component";
import {FaUserShield} from "@react-icons/all-files/fa/FaUserShield";
import {BsCalendar2DateFill, SiGooglenews} from "react-icons/all";
import {IoReaderSharp} from "@react-icons/all-files/io5/IoReaderSharp";
import React, {useEffect} from "react";
import MangaCardHome from "../home-page/MangaCardHome/MangaCardHome";
import {getTopMangaViewsAPI} from "../../services/search.service";
import {AxiosResponse} from "axios";
import {IManga} from "../../interfaces/manga.interface";

const UserInfoComponent  = ()  => {
    const [manga, setManga] = React.useState<any>([]);
    useEffect(() => {
        getTopMangaViewsAPI().then((res: AxiosResponse<IManga[]>) => {
            setManga(res.data);
        });
    },[]);
    return (
        <div className="overflow-y-scroll max-h-[450px] mt-5 p-3 flex flex-wrap  justify-around " dir="ltr">
            {
                manga.map((manga:IManga, index:number) => {
                    return <div className="m-1 ">
                        <MangaCardHome key={index} manga={manga}/>
                    </div>

                })
            }
        </div>
    )
}

export default UserInfoComponent
