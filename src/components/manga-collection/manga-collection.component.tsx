import MangaCollectionCard from "./manga-collection.card";
import React, {useEffect} from "react";
import {IManga} from "../../interfaces/manga.interface";
import {getTopMangaViewsAPI} from "../../services/search.service";
import {AxiosResponse} from "axios";

const MangaCollectionComponent = () => {
    const [mangaList, setMangaList] = React.useState<IManga[]>([]);
    useEffect(() => {
        getTopMangaViewsAPI().then((res: AxiosResponse<IManga[]>) => {
            setMangaList([...res.data,...res.data]);

        });
    }, []);

    return (
        <div className="bg-base-300 w-full  rounded-xl h-[27.75rem]  p-3" dir="ltr">
            <div className="overflow-x-hidden overflow-y-scroll space-y-1.5  h-full rounded-xl">
                {
                    mangaList.map((manga, index) => {
                        return <MangaCollectionCard type={
                            (index === 0) ? "start" : (index === mangaList.length - 1) ? "end" : "mid"
                        } key={index} manga={manga}/>
                    })


                }

            </div>
        </div>
    );
}

export default MangaCollectionComponent;
