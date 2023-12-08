import SearchContentComponent from "./search-content.component";
import SearchAdvancedComponent from "./search-advanced.component";
import React, {useEffect} from "react";
import {IManga, MangaTypesEnum, StatusTypeEnum} from "../../interfaces/manga.interface";
import useManga from "../../hooks/manga/useManga.hook";
import {AxiosResponse} from "axios";
import {searchAPI} from "../../services/search.service";
import {IGenre} from "../../interfaces/genre.interface";
import genresService from "../../services/genre.service";
import {FiSearch, IoIosArrowUp, MdOutlineClose} from "react-icons/all";
import {addToast} from "../../reducers/toast/toast.reducer";
import store from "../../store";
import {ExcludeIncludeBtn} from "./exclude-include.btn";

const CARDS_PER_PAGE = 16
interface ResponseSearch {
    items: IManga[],
    count: number,
}

const SearchPage = () => {
    const [manga, setManga] = React.useState<IManga[]>([]);
    const [count, setCount] = React.useState(0);
    const perPage = 16
    const {getManga} = useManga()
    const [search, setSearch] = React.useState<string>('');

    const [genres, setGenres] = React.useState<IGenre[]>([]);
    const [showAdvanced, setShowAdvanced] = React.useState(false);


    useEffect(() => {
        genresService.findAll().then((res: AxiosResponse) => {
            setGenres(res.data);
        });


        getManga({offset: 0, limit: perPage}).then((res: AxiosResponse) => {
            res.data = res.data as ResponseSearch
            setManga(res.data.items);
            setCount(res.data.count);
        })
    }, [])

    const [sortBy, setSortBy] = React.useState<"views" | "rate">("views")
    const [include_genres, setIncludeGenres] = React.useState<number[]>([]);
    const [exclude_genres, setExcludeGenres] = React.useState<number[]>([]);
    const [type, setType] = React.useState<MangaTypesEnum>(MangaTypesEnum.Manga);
    const [status, setStatus] = React.useState<StatusTypeEnum>(StatusTypeEnum.Ongoing);
    const [page,  setPage] = React.useState(0);
    const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);
    const handleSearch = () => {


        searchAPI(page * CARDS_PER_PAGE , search, include_genres, exclude_genres , CARDS_PER_PAGE , type , status).then((res: AxiosResponse) => {
            res.data = res.data as ResponseSearch
            setCount(res.data.count);
            setManga(res.data.items);
        })
    }

    return (
        <>
            <div className="drawer-content">
                <div className="container mx-auto p-5">
                    <div className="form-control max-w-3xl mx-auto">
                        <div className="flex justify-center items-center space-x-2">
                            <input type="text"
                                   onChange={(e) => {
                                       setSearch(e.target.value)
                                       handleSearch()
                                   }}
                                   className="input input-md bg-base-300 w-full  text-center"
                                   placeholder="عن ماذا تبحث ؟"/>
                            <button className="btn btn-square text-xl" onClick={() => {
                                store.dispatch(addToast({
                                    type: "warning",
                                    title: "عذرا ، البحث غير متاح حالياً",
                                    message: " ، يبدو ان السرفر قاد عاد للعمل منذ فترة صغيرة و لم نستطيع تجميع البيانات بعدً"
                                }))


                            }
                            }>
                                <FiSearch/>
                            </button>
                            <button className="btn btn-square text-xl" onClick={() => {
                                setShowAdvanced(!showAdvanced)
                            }} style={{
                                rotate: showAdvanced ? "180deg" : "0deg",
                                transition: "0.5s"
                            }}>
                                <IoIosArrowUp/>
                            </button>
                        </div>


                        <div className="container mx-auto  max-w-3xl">
                            <SearchAdvancedComponent open={showAdvanced}/>
                        </div>
                    </div>
                </div>
                <SearchContentComponent manga={manga} count={count}/>

                <button className="btn btn-primary bottom-8 right-8 fixed" onClick={()=>setShowAdvancedSearch(!showAdvancedSearch)}>
                    hide
                </button>
                <div className={`fixed flex flex-col max-w-[80%] w-80 z-10 h-[90%] p-6 rounded-xl bg-base-300 bottom-1  duration-500 -right-full ${showAdvancedSearch ? "!right-0" : ""}`}>
                    <div className="bg-base-100 w-full  rounded-box text-right p-3">
                        <h1 className="text-xl font-bold  "> ترتيب</h1>
                        <ul className="space-y-2 mt-4 font-medium  ">
                            <li className="">
                                <label htmlFor="views"
                                       className={(sortBy == "views") ? "text-primary" : ""}> المشاهدات</label>
                                <input hidden type="radio" name="sort" id="views" checked={sortBy == "views"}
                                       onChange={() => setSortBy("views")}/>
                            </li>
                            <hr/>
                            <li className="">
                                <label htmlFor="rate"
                                       className={(sortBy == "rate") ? "text-primary" : ""}>التقيمات</label>
                                <input hidden type="radio" name="sort" id="rate" checked={sortBy == "rate"}
                                       onChange={() => setSortBy("rate")}/>
                            </li>
                        </ul>

                    </div>
                    <div
                        className="bg-base-100 p-3 flex justify-center items-center flex-col h-24 mt-8 rounded-xl rounded-b-md w-full ">
                        <div className="flex w-full justify-center">
                            <button className={`btn btn-sm w-1/2 rounded-r-sm  rounded-b-sm rounded-xl ${(status == StatusTypeEnum.Stopped ? "btn-primary" : "")}`}
                                    onClick={() => {
                                        setStatus(StatusTypeEnum.Stopped)
                                    }}>

                                متوقف

                            </button>
                            <button className={`btn btn-sm w-1/2 ml-1 rounded-l-sm ${(status == StatusTypeEnum.Ongoing ? "btn-primary" : "")}`}
                                    onClick={() => {
                                        setStatus(StatusTypeEnum.Ongoing)
                                    }}
                            >مستمر</button>
                        </div>
                        <button className={`btn btn-sm w-full mt-1 rounded-b-xl rounded-sm ${(status == StatusTypeEnum.Finished ? "btn-primary" : "")}`}
                        onClick={()=>{
                            setStatus(StatusTypeEnum.Finished)
                        }}

                        >منتهي</button>
                    </div>

                    <div
                        className="bg-base-100 p-3 flex justify-center items-center flex-col mt-2 rounded-xl rounded-t-sm rounded-b-sm w-full ">
                        <div className="flex w-full justify-center">
                            <button className={`btn btn-sm w-1/2 rounded-r-sm  rounded-b-sm rounded-xl ${(type == MangaTypesEnum.Manga ? "btn-primary" : "")}`}
                                    onClick={() => {
                                        setType(MangaTypesEnum.Manga)
                                    }}>
                                مانجا
                            </button>
                            <button className={`btn btn-sm w-1/2 ml-1 rounded-l-sm ${(type == MangaTypesEnum.Manhua ? "btn-primary" : "")}`}
                                    onClick={() => {
                                        setType(MangaTypesEnum.Manhua)
                                    }}>
                                مانها
                            </button>
                        </div>
                        <div className="flex w-full justify-center mt-1">
                            <button className={`btn btn-sm w-1/2 rounded-r-sm  rounded-b-sm rounded-xl ${(type == MangaTypesEnum.Manhwa ? "btn-primary" : "")}`}
                                    onClick={() => {
                                        setType(MangaTypesEnum.Manhwa)
                                    }} >
                                مانهوا
                            </button>
                            <button className={`btn btn-sm w-1/2 ml-1 rounded-sm ${(type == MangaTypesEnum.Webtoon ? "btn-primary" : "")}`}
                                    onClick={() => {
                                        setType(MangaTypesEnum.Webtoon)
                                    }}
                            >
                                ويبتون
                            </button>
                        </div>
                        <div className="w-full">
                            <button className={`btn btn-sm w-full mt-1 rounded-b-xl rounded-sm ${(type == MangaTypesEnum.Novel ? "btn-primary" : "")}`} onClick={() => {
                                setType(MangaTypesEnum.Novel)
                            }}>
                                رواية
                            </button>
                        </div>

                    </div>

                    <ul className="w-full mb-2 bg-base-100  max-h-full overflow-y-scroll mt-2 flex flex-wrap justify-center p-3 rounded-xl rounded-t-sm content-start">
                        {
                            [...genres, ...genres, ...genres, ...genres].map((genre: IGenre) => {
                                return (
                                    <ExcludeIncludeBtn content={genre.name} onClick={(state) => {
                                        if (state == "included") {
                                            setIncludeGenres([...include_genres, genre.id]);
                                        }
                                        if (state == "excluded") {
                                            setExcludeGenres([...exclude_genres, genre.id]);
                                        }
                                        if (state == "none") {
                                            setIncludeGenres(include_genres.filter((g) => g != genre.id));
                                            setExcludeGenres(exclude_genres.filter((g) => g != genre.id));
                                        }
                                    }
                                    }/>
                                )
                            })
                        }
                    </ul>

                    <div className="w-full flex mt-auto">
                        <button onClick={()=>setShowAdvancedSearch(!showAdvancedSearch)} className="text-lg btn w-1/6 btn-error btn-outline   mr-2">
                            <span><MdOutlineClose/></span>
                        </button>

                        <button className="btn w-5/6   rounded-xl rounded-t-sm rounded-b-md "
                                onClick={handleSearch}>

                            <FiSearch/>
                            <span className="font-bold ml-2">
                            بحث
                        </span>
                        </button>

                    </div>

                </div>
            </div>


        </>
    );
}

export default SearchPage;
