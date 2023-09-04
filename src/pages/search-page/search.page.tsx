import SearchContentComponent from "./search-content.component";
import {GoSettings} from "@react-icons/all-files/go/GoSettings";
import SearchAdvancedComponent from "./search-advanced.component";
import React, {useEffect} from "react";
import {IManga} from "../../interfaces/manga.interface";
import useManga from "../../hooks/manga/useManga.hook";
import {AxiosResponse} from "axios";
import {searchAPI} from "../../services/search.service";
import {IGenre} from "../../interfaces/genre.interface";
import genresService from "../../services/genre.service";
import {FiSearch, IoIosArrowUp} from "react-icons/all";
import {addToast} from "../../reducers/toast/toast.reducer";
import store from "../../store";

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
    const [include_genres, setIncludeGenres] = React.useState<number[]>([]);
    const [exclude_genres, setExcludeGenres] = React.useState<number[]>([]);
    const [genres, setGenres] = React.useState<IGenre[]>([]);
    const [showAdvanced, setShowAdvanced] = React.useState(false);
    const handleSearch = () => {


        searchAPI(0 ,search, include_genres, exclude_genres).then((res: AxiosResponse) => {
            res.data = res.data as ResponseSearch
            setCount(res.data.count);
            setManga(res.data.items);
        })
    }


    useEffect(() => {
        genresService.findAll().then((res: AxiosResponse) => {
           // setGenres(res.data);
        });


        getManga({offset: 0, limit: perPage}).then((res: AxiosResponse) => {
            res.data = res.data as ResponseSearch
            setManga(res.data.items);
            setCount(res.data.count);
        })
    }, [])
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
                            <button className="btn btn-square text-xl" onClick={()=>{
                                store.dispatch(addToast({
                                    type: "warning",
                                    title: "عذرا ، البحث غير متاح حالياً",
                                    message: " ، يبدو ان السرفر قاد عاد للعمل منذ فترة صغيرة و لم نستطيع تجميع البيانات بعدً"
                                }))


                            }
                            }>
                                <FiSearch/>
                            </button>
                            <button className="btn btn-square text-xl" onClick={()=>{setShowAdvanced(!showAdvanced)}} style={{
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
            </div>


        </>
    );
}

    export default SearchPage;
