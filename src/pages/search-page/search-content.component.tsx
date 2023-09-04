import React from "react";
import SearchMangaCard from "./search-manga.card";

const cardsPerPage = 16


import {motion} from "framer-motion";
import {IManga} from "../../interfaces/manga.interface";

const SearchContentComponent = ({manga , count} : {manga : IManga[], count:number}) => {
    const [page, setPage] = React.useState(1);
    const activePage = (pageNumber: number) => {
        setPage(pageNumber);
    }
    const around = (number: number): number => {
        if (Math.floor(number) < number) {
            return Math.floor(number) + 1
        }
        return Math.floor(number)
    }
    return (
        <div className="container mx-auto">
            <motion.div key={page} className="w-full flex flex-wrap justify-around p-3 " initial={{opacity: 0}}
                        animate={{opacity: 1}} transition={{duration: 0.5}}>
                {manga.map((manga, index) => <SearchMangaCard manga={manga} key={`manga_search_${index}`}/>)}
            </motion.div>
            <div className="w-full flex justify-center mb-5">
                <div className="btn-group">
                    {Array.from(Array(around(manga.length / cardsPerPage)), (e, i) => {
                        return (
                            <button onClick={() => {
                                activePage(i + 1)
                            }} className={`btn btn-md ${(page == (i + 1) ? "btn-active" : "")}`}
                                    key={`page-${i + 1}`}>{i + 1}</button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchContentComponent
