import React from "react";
import MangaList from "./MangaList";
import useManga from "../../../../hooks/manga/useManga.hook";
import {AxiosResponse} from "axios";
import {IManga, ISearchManga} from "../../../../interfaces/manga.interface";

const MangaAdminPage = () => {
    const {getMangaAdmin} = useManga();
    const [manga, setManga] = React.useState<IManga[]>([]);
    const [perPage, setPerPage] = React.useState<number>(20);
    React.useEffect(() => {
        getMangaAdmin({
            offset: 0,
            limit: perPage,
        }).then((res:AxiosResponse<ISearchManga>) => {

            setManga(res.data.items);
        });
    },[perPage]);
    return(
        <>
            <MangaList manga={manga}/>
        </>
    )
}

export default MangaAdminPage
