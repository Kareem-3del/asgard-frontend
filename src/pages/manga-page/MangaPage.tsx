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
import WriteNovelChapter from "./modals/write-novel-chapter.modal";

const MangaPage = () => {
    const {getMangaById} = useManga();
    const [manga, setManga] = useState<IManga>();
    const {mangaSlug} = useParams();
    const [showComments, setShowComments] = useState<boolean>();
    function handleUpload(chapter:IChapter) {

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
    function handleDeleteChapters(chaptersStatus : {chapter : IChapter , done : boolean}){
        // delete chapter from selected chapters
        if(chaptersStatus.done){
            setManga({
                ...manga,
                chapters : manga?.chapters?.filter((chapter)=>{
                    return chapter.id !== chaptersStatus.chapter.id;
                })
            } as IManga);
        }

    }
    return (
        <>
            {manga && <div className="z-0">
                <MangaMainInfoComponent  onCommentsBtnClick={() => setShowComments(!showComments)} manga={manga}/>
                <div className="p-3">
                    <div className="mt-3 flex justify-center items-center container mx-auto max-sm:hidden">
                        <AdsComponent width="100%" size={"wide-sm"}/>

                    </div>
                    <div className="container h-[662px] mx-auto space-x-2 flex my-3 ">
                        <div className="flex-col h-full space-between w-9/12 max-sm:w-full">
                            <motion.div
                                key={`a-${showComments}`}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1}}
                                className="flex flex-col h-full space-y-2">
                                {
                                    (showComments) ? <Comments id={`manga_${manga.id}`}/> : <>
                                        <MangaChaptersComponent onDelete={handleDeleteChapters} chapters={manga.chapters}/>
                                        <UsersWorkComponent users={manga.users_working}/>
                                    </>

                                }

                            </motion.div>
                        </div>
                        <div className="flex-col space-y-2 w-3/12 hidden md:flex max-sm:w-full max-sm:pr-4">
                            <MangaStoryComponent story={manga.story}/>
                            <AdsComponent className=" h-full " width="100%" size={"box-sm"}/>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-center items-center container mx-auto max-sm:hidden">
                        <AdsComponent width="100%" size={"wide-sm"}/>

                    </div>

                    <div className="w-full justify-center flex my-5 mt-3 px-3">
                        <BadgeComponent options={{
                            divClass: "w-64 px-4",
                            textClass: "text-xl",


                        }} icon={<AiFillFire/>} text="الاعمال المشابهة"/>
                    </div>
                    <MangaSliderV3/>
                    <EditMangaModal manga={manga}/>
                    <DeleteMangaModal manga={manga}/>
                    <UploadChapterModal manga={manga} handleUpload={handleUpload}/>
                    <WriteNovelChapter manga={manga} handleUpload={handleUpload}/>
                    <div className="mt-3 flex justify-center items-center container mx-auto max-sm:hidden">
                        <AdsComponent width="100%" size={"wide-sm"}/>

                    </div>
                </div>
            </div>}
            {!manga && <div className="flex justify-center items-center h-screen">
                Loading....
            </div>}

        </>
    );
}
export default MangaPage;
