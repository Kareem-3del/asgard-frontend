import React from "react";
import ChapterList, {IChp} from "./ChapterList";
import {AxiosResponse} from "axios";
import {getDeletedChapters} from "../../../../services/chapter.service";
import {ShowChapterModal} from "./ShowChapter.modal";

const BinAdminPage = () => {
    const [chapters, setChapters] = React.useState<IChp[]>([]);
    const [perPage, setPerPage] = React.useState<number>(20);



    React.useEffect(() => {
        getDeletedChapters(perPage).then((res: AxiosResponse<IChp[]>) => {
            setChapters(res.data);
        });
    }, [perPage]);

    const handleDelete = (chpId:number) => {
        setChapters(chapters.filter((chp)=>chp.id !== chpId));
    }
    return (
        <div className="flex-col flex w-full">
            <div className="w-full flex space-x-5" dir="rtl">
                {/* Add Select Box to Select how match manga per page */}
                <div className="mt-2">
{/*
                    <label className="label ml-2 mt-0">عدد العناصر</label>
*/}
                    <select className="select select-bordered w-48"
                            onChange={(e) => setPerPage(parseInt(e.target.value))}>

                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>


            </div>
            <div className="w-full">
                <ChapterList handleDelete={handleDelete} chapters={chapters}/>
            </div>
        </div>
    )
}

export default BinAdminPage
