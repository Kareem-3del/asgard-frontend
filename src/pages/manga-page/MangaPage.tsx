import React, {useEffect, useState} from "react";
import MangaChaptersComponent from "./components/manga-chapters.component";
import DeleteMangaModal from "./modals/delete-manga.modal";
import UploadChapterModal from "./modals/upload-chapter.modal";
import MangaSliderV3 from "./manga-slider/manga-slider-v3";
import UsersWorkComponent from "./components/users-work/users-work.component";
import MangaMainInfoComponent from "./components/manga-main-info.component";
import MangaStoryComponent from "./components/manga-story.component";
import AdsComponent from "../../components/ads/ads.component";
import useManga from "../../hooks/manga/useManga.hook";
import {useParams} from "react-router-dom";
import {AxiosResponse} from "axios";
import {IManga} from "../../interfaces/manga.interface";
import "./scss/Comments.scss"
import Comments from "../../components/comments/Comments";
import {motion} from "framer-motion";
import BadgeComponent from "../../components/badge/badge.component";
import {AiFillFire} from "@react-icons/all-files/ai/AiFillFire";
import EditMangaModal from "./modals/edit-manga.modal";
import {IChapter} from "../../interfaces/chapter.interface";

const MangaPage = () => {
    const {getMangaById} = useManga();
    const [manga, setManga] = useState<IManga>();
    const {mangaSlug} = useParams();
    const [showComments, setShowComments] = useState<boolean>();
    function handleUpload(chapter:IChapter) {

       // push new chapter to chapters array

        setManga({
            ...manga,
            chapters : (manga?.chapters) ? [...manga.chapters , chapter] : [chapter]
        } as IManga);
        console.log(manga?.chapters,chapter)
    }

    useEffect(() => {
        getMangaById(mangaSlug || 0).then((res: AxiosResponse<IManga>) => {
            setManga(res.data);
        });
    }, [mangaSlug])
    return (
        <>
            {manga && <div className="z-0">
                <MangaMainInfoComponent onCommentsBtnClick={() => setShowComments(!showComments)} manga={manga}/>
                <div className="mt-3 flex justify-center items-center container mx-auto max-sm:hidden">
                    <AdsComponent width="100%" size={"wide-sm"}/>

                </div>
                <div className="container mx-auto space-x-2 flex my-3 max-sm:flex-col-reverse">
                    <div className="flex-col space-between w-9/12 max-sm:w-full">
                        <motion.div
                            key={`a-${showComments}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                            className="flex flex-col space-y-2">
                            {
                                (showComments) ? <Comments/> : <div>
                                    <MangaChaptersComponent chapters={manga.chapters}/>
                                    <UsersWorkComponent users={manga.users_working}/>
                                </div>

                            }

                        </motion.div>


                    </div>
                    <div className="flex-col space-y-2 w-3/12 max-sm:w-full max-sm:pr-4">
                        <MangaStoryComponent story={manga.story}/>
                        <AdsComponent width="auto" size={"box-sm"}/>
                    </div>
                </div>
                <div className="w-full justify-center flex my-8 px-3">
                    <BadgeComponent options={{
                        divClass: "w-64 h-16",
                        textClass: "text-xl",


                    }} icon={<AiFillFire/>} text="الاعمال المشابهة"/>
                </div>
                <MangaSliderV3/>

                <EditMangaModal manga={manga}/>
                <DeleteMangaModal manga={manga}/>
                <UploadChapterModal manga={manga} handleUpload={handleUpload}/>

            </div>}
            {!manga && <div className="flex justify-center items-center h-screen">
                Loading....
            </div>}
        </>
    );
}
export default MangaPage;
