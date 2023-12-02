import React, {useEffect} from "react";
import {BiSearchAlt} from "@react-icons/all-files/bi/BiSearchAlt";
import {searchAPI} from "../../services/search.service";
import {AxiosResponse} from "axios";
import {IManga} from "../../interfaces/manga.interface";
import {Link} from "react-router-dom";
import {Rating} from "../rating/rating.component";
import {TypeImage} from "../type-image/type-image.component";

interface ResponseSearch {
    items: IManga[],
    count: number,
}

const SearchBtnComponent = ({isFooterSearch} : { isFooterSearch? : boolean}) => {
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
        <div className={"w-64 flex relative dropdown"} dir="ltr">
            <input type="text" id="search-input"
                   onChange={(e) => {
                          setSearchText(e.target.value)
                          handleSearch()
                   }}
                   className={`w-52 focus:w-64 focus:bg-base-100 bg-base-300 !outline-0 border-0 input h-10 focus:opacity-1 transition-all duration-500 pl-10 ${isFooterSearch && "!w-full"}` } dir="ltr"/>
            <label htmlFor="search-input"  className="absolute left-2.5 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </label>
            <div tabIndex={0} className="dropdown-content w-64  shadow bg-base-100 mt-12 rounded-xl">
                <ul className="max-h-96 overflow-y-scroll card-body p-2">
                    {
                        manga[0] ? manga.map((manga, index) => <MangaSearchCard key={index} manga={manga}/>) :
                            <>
                                <div className="flex h-16 justify-center items-center w-full bg-base-300 rounded-lg">
                                    <h1 className="flex">لم يتم العثور علي شئ
                                        <span className="text-2xl ml-2"><BiSearchAlt/></span>
                                    </h1>
                                </div>
                            </>
                    }
                </ul>
            </div>





{/*
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
            </label>*/}

        </div>

    )

}


const MangaSearchCard = ( {manga}: { manga: IManga}) => {
    return (
        <li className="w-full bg-base-300 md:bg-base-200 flex h-20 md:p-2 rounded-lg">

            <Link to={`/manga/${manga.slug}`} className=" md:w-12 w-2/6 h-full  p-0">
                <img alt={manga.cover_url} className="w-full h-full object-cover"  src={manga.cover_url}/>
            </Link>


            <div className="ml-2 md:w-full w-4/6 flex flex-col justify-center">
                <Link to={`/manga/${manga.slug}`} className="text-lg font-semibold capitalize">{manga.title}</Link>
                <div className="flex items-center space-x-2" dir="ltr">
                    <TypeImage mangaType={manga.type} largeIcons={true} className="h-8 w-8 rounded-lg"/>
                   <Rating disabled={true} manga={manga} className="rating-sm bg-base-300 h-8 px-2 flex justify-center items-center rounded-lg"/>

                </div>
            </div>
        </li>
    )
}
export default SearchBtnComponent
