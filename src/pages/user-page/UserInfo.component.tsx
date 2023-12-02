
import React, {useEffect} from "react";
import {getTopMangaViewsAPI} from "../../services/search.service";
import {AxiosResponse} from "axios";
import {IManga} from "../../interfaces/manga.interface";
import MangaSlideCardV3 from "../manga-page/manga-slider/manga-slide.card";

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
                    return <div className="m-1">
                        <MangaSlideCardV3 key={index} manga={manga}/>
                    </div>

                })
            }
        </div>
    )
}

export default UserInfoComponent
