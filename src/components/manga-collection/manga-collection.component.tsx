import MangaCollectionCard from "./manga-collection.card";
import React, {useEffect} from "react";
import {IManga} from "../../interfaces/manga.interface";
import {getTopMangaViewsAPI} from "../../services/search.service";
import {AxiosResponse} from "axios";

const MangaCollectionComponent = () => {
    const [mangaList, setMangaList] = React.useState<IManga[]>([]);
    useEffect(() => {
        getTopMangaViewsAPI().then((res: AxiosResponse<IManga[]>) => {
            setMangaList(res.data);
        });
    }, []);

    return (
        <div className="bg-base-300 w-full  rounded    p-3" dir="ltr">
            <div className="overflow-x-hidden overflow-y-scroll space-y-3 h-96">
                {
                    mangaList.map((manga, index) => {
                        return <MangaCollectionCard key={index} manga={manga}/>
                    })

                }
            </div>
        </div>
    );
}

export default MangaCollectionComponent;
