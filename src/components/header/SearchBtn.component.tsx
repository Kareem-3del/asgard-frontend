import React, {useEffect} from "react";
import {BiSearchAlt} from "@react-icons/all-files/bi/BiSearchAlt";
import {searchAPI} from "../../services/search.service";
import {AxiosResponse} from "axios";
import {IManga} from "../../interfaces/manga.interface";
import {VscDebugBreakpointData} from "@react-icons/all-files/vsc/VscDebugBreakpointData";
import {getStatusColor, getTypeFlag} from "../../utils/manga-helper";
import {MdLocationPin} from "react-icons/all";
import {Link} from "react-router-dom";

interface ResponseSearch {
    items: IManga[],
    count: number,
}

const SearchBtnComponent = () => {
    const [search_text, setSearchText] = React.useState<string>('');
    const [manga, setManga] = React.useState<IManga[]>([]);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const handleSearch = () => {

        searchAPI(page, search_text).then((res: AxiosResponse) => {
            res.data = res.data as ResponseSearch
            setCount(res.data.count);
            setManga(res.data.items);
        })
    }

    return (
        <div className="">
            <label htmlFor="search-model" className="swap-off fill-current btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </label>
            <input type="checkbox" id="search-model" className="modal-toggle"/>
            <label htmlFor="search-model" className="z-50 modal cursor-pointer bg-opacity-80">
                <label className="modal-box relative max-w-5xl p-5" htmlFor="">
                    <div className="form-control w-full">
                        <input type="text" placeholder="عن ماذا تبحث ؟..." className="input input-bordered w-full "
                               onChange={(e) => {
                                   setSearchText(e.target.value)
                                   handleSearch()
                               }}
                        />
                    </div>


                    {!manga[0] &&
                        <div className="flex h-16 justify-center items-center w-full mt-5 bg-base-300 rounded">
                            <h1 className="flex">
                                لم يتم العثور علي شئ

                                <span className="text-2xl mr-2"><BiSearchAlt/></span>


                            </h1>
                        </div>}

                    {manga[0] &&
                        <div className="max-h-[300px] flex flex-col overflow-x-hidden overflow-y-scroll">
                            {
                                manga.map((manga, index) => <MangaSearchCard key={index} manga={manga}/>)
                            }
                        </div>}


                </label>
            </label>

        </div>

    )

}


const MangaSearchCard = ( {manga}: { manga: IManga}) => {
    console.log("==MANGA===> ",manga)
    return (
        <div className="w-full bg-base-300 flex h-36 p-2">

            <Link to={`/manga/${manga.slug}`} className="w-24 bg-black flex-none">
                <img alt={manga.cover_url} className="h-full w-full object-cover"  src={manga.cover_url}/>
            </Link>
            <div className="mr-3 flex-none flex flex-col justify-center">
                <Link to={`/manga/${manga.slug}`} className="text-2xl font-bold capitalize">{manga.title}</Link>
                <div className="flex items-center mb-2" dir="ltr">
                    <div className="h-6 w-8 mt-1 mr-3">
                        <img className="w-full h-full rounded-sm" src={getTypeFlag(manga.type)} alt="MANGA-TYPE"/>
                    </div>
                    <div className="rating rating-sm space-x-1" dir="ltr">
                        <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                        <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400" checked/>
                        <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                        <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                        <input type="radio" name={"manga-card-search-rating"+manga.id} className="mask mask-star-2 bg-orange-400"/>
                    </div>

                </div>
                <div>
                    <span className="text-sm">التصنيفات : </span>
                    <span className="text-sm">{manga.genres.map((genre) => <span className="badge">{genre.name}</span>,)}</span>
                </div>
                <div className="flex  items-center">
                    <span className="text-sm">الحالة : </span>
                    <span className="text-sm"> <VscDebugBreakpointData color={getStatusColor(manga.status)}/></span>
                </div>
            </div>
        </div>
    )
}
export default SearchBtnComponent
