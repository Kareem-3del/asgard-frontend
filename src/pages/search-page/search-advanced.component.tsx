import {motion} from "framer-motion";
import React from "react";
import {ExcludeIncludeBtn} from "./exclude-include.btn";
import {IGenre} from "../../interfaces/genre.interface";

const SearchAdvancedComponent = ({open}: { open: boolean }) => {
    const [include_genres, setIncludeGenres] = React.useState<string[]>([]);
    const [exclude_genres, setExcludeGenres] = React.useState<string[]>([]);
    const [genres, setGenres] = React.useState<IGenre[]>([]);
    return (
        <motion.div
            transition={{duration: 0.5}}
            initial={{opacity: 1, height: "100px"}}
            animate={{opacity: open ? 1 : 0, height: open ? "260px" : 0}}
            className="flex flex-wrap justify-center items-center p-5 space-y-3 bg-base-300 mt-3 rounded-xl overflow-hidden   mx-auto"
            // key={"search-advanced"+open}
        >
            <div className="flex w-full justify-between space-x-2" dir="ltr">
                <div className="space-x-1 bg-base-200 py-4 rounded-xl px-4 flex w-full justify-center items-center"
                     dir="ltr">
                    <button className="btn rounded-lg btn-sm w-1/4">مانجا</button>
                    <button className="btn rounded-lg btn-sm w-1/4">مانها</button>
                    <button className="btn rounded-lg btn-sm w-1/4">مانهوا</button>
                    <button className="btn  rounded-lg btn-sm w-1/4">ويبتون</button>
                </div>
                <div className="space-x-1 bg-base-200 py-4 rounded-xl flex w-8/12 px-4" dir="ltr">
                    <button className="btn rounded-lg btn-sm w-1/3">متوقف</button>
                    <button className="btn  rounded-lg btn-sm w-1/3">مكتمل</button>
                    <button className="btn rounded-lg btn-sm w-1/3">مستمر</button>
                </div>
            </div>
            <div
                className="space-x-2 flex flex-wrap w-full justify-between content-center items-center bg-base-200 p-3 rounded-lg h-36 overflow-hidden overflow-y-scroll">
                {
                    ["genres", "assssd", "assssd", "asdbv", "genres", "asd", "wqeq", "213", "genres", "assssd", "asdbv", "genres", "asd", "wqeq", "213", "21451", "asdbv", "genres", "asd", "asd", "asd", "wqeq", "213", "21451", "asdbv"].map((genre: string) => {
                        return (
                            <ExcludeIncludeBtn content={genre} onClick={(state) => {
                                if (state == "included") {
                                    setIncludeGenres([...include_genres, genre]);
                                }
                                if (state == "excluded") {
                                    setExcludeGenres([...exclude_genres, genre]);
                                }
                                if (state == "none") {
                                    setIncludeGenres(include_genres.filter((g) => g != genre));
                                    setExcludeGenres(exclude_genres.filter((g) => g != genre));
                                }
                            }
                            }/>
                        )
                    })
                }
            </div>
        </motion.div>);
}

export default SearchAdvancedComponent;
