import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IChapter} from "../../interfaces/chapter.interface";
import {IManga} from "../../interfaces/manga.interface";
import {motion} from "framer-motion";
import ChapterControl from "./Chapter-Control";
import {useChapter} from "../../hooks/useChapter";
import {MdNavigateNext, MdNavigateBefore, AiFillDelete, FaLock, IoIosArrowDown} from "react-icons/all";
import {FaCoins} from "react-icons/fa";
import useAuth from "../../hooks/auth/useAuth.hook";
import Comments from "../../components/comments/Comments";


export const ConfirmBuyChapterModal = ({handelChapterBuy, chapter}: {
    handelChapterBuy: Function,
    chapter: IChapter
}) => {
    const {user} = useAuth();
    const {buy_chapter} = useChapter();
    const navigate = useNavigate();
    return (
        <>
            <input type="checkbox" id="buy-chapter" className="modal-toggle"/>
            <div className="modal" dir="rtl">
                <div className="modal-box">
                    <h2 className="inline-flex mb-5">
                        شراء الفصل {chapter.number} بـ <span className="mx-1 text-accent font-bold">10</span> نقاط
                        <span className="mr-2"><FaCoins/></span>
                    </h2>
                    {user ? <h3 className="font-bold text-lg text-center">
                        رصيدك الحالي هو <span>{user.coins}</span> نقطة
                    </h3> : <h3 className="font-bold text-lg text-center">
                        يجب عليك <span className="text-secondary">تسجيل الدخول</span> اولا
                    </h3>
                    }

                    <div className="modal-action" dir="ltr">
                        <label htmlFor="buy-chapter" className="btn">الغاء</label>
                        {
                            user && (user.coins >= 10) && <button className="btn btn-primary" onClick={() => {
                                buy_chapter(chapter.id).then(() => {
                                    handelChapterBuy();
                                });
                                navigate(`./${chapter.number}`);
                            }}>شراء</button>
                        }
                        {
                            user && user.coins < 10 && <Link to="/premium" className="btn btn-primary">شحن</Link>
                        }
                        {
                            !user && <Link to="/auth/login" className="btn btn-primary">تسجيل الدخول</Link>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
const BuyChapterModal = ({chapter, handelChapterBuy}: { chapter: IChapter, handelChapterBuy: Function }) => {

    return (
        <>

            <ConfirmBuyChapterModal handelChapterBuy={handelChapterBuy} chapter={chapter}/>

            <div className="w-full h-64 bg-base-300 rounded-box">
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-xl text-center mb-10 mt-5 opacity-80">
                        تحتاج الى شراء الفصل حتي تتمكن من قرائته او يمكنك استخدام رابط الاختصار
                    </h1>
                    <div className="space-x-3">
                        <a href={chapter.short_link.redirect_url} target="_blank"
                           className="btn btn-secondary btn-outline w-52 h-12">رابط الاختصار</a>
                        <label htmlFor="buy-chapter" className="btn btn-accent  w-52 h-12">
                            <span className="mr-2"><FaCoins/></span>
                            شراء الفصل
                        </label>

                    </div>

                </div>


            </div>


        </>
    )
}
const ChapterPage = () => {
    const {chapterNumber, mangaSlug, chapterId} = useParams();
    const {chapter, chapters, getChapterByNumber, getDeletedChapterById} = useChapter();
    const [chapterBought, setChapterBought] = useState(false);


    useEffect(() => {
        if (chapterId) {
            getDeletedChapterById(Number(chapterId));
        }

        if (chapterNumber && mangaSlug) {
            getChapterByNumber(mangaSlug, Number(chapterNumber));
        }

    }, [chapterNumber, mangaSlug]);

    useEffect(() => {
        if (!chapter?.short_link) {
            setChapterBought(true);
            return;
        }
        setChapterBought(false)
        let looked_chapters = localStorage.getItem("chapters_locked");
        if (looked_chapters) {
            let looked_chapters_array = JSON.parse(looked_chapters);
            if (looked_chapters_array.includes(chapter?.id)) {
                setChapterBought(true);
            }
        } else {
            setChapterBought(false)
        }
        console.log(chapter?.id, looked_chapters)
    }, [chapter]);

    function handelChapterBuy() {
        localStorage.setItem("chapters_locked", JSON.stringify([...JSON.parse(localStorage.getItem("chapters_locked") || "[]"), chapter?.id]));
        setChapterBought(true);
    }

    return (
        <>

            <div
                className="w-full max-w-screen-lg flex flex-col justify-center container mx-auto p-5 ">

                {chapter && chapters && <ChapterNavigator chapter={chapter} chapters={chapters}/>}

                <div>
                    <h2 className="text-xl text-center opacity-60">الفصل بعنوان</h2>
                    <h1 className="text-4xl font-bold text-center mb-10 mt-2 opacity-80">
                        {chapter?.title}</h1>
                </div>
                {
                    (chapter && (!chapter.short_link || chapterBought)) &&
                    <motion.div
                        className="flex flex-col justify-center items-center"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                        key={chapter?.number}>
                        {
                            chapter?.images_urls.map((image, index) => <Image src={image}
                                                                              key={`chapter_image_${index}`}/>)
                        }
                    </motion.div>
                }
                {
                    chapter && (!chapterBought) && chapter.short_link &&
                    <BuyChapterModal handelChapterBuy={handelChapterBuy} chapter={chapter}/>
                }


                {
                    chapter?.content_text &&
                    <div className="text-right" dangerouslySetInnerHTML={{__html: chapter.content_text}}/>
                }


                <br/>
                <br/>
                {chapter && chapters && <ChapterNavigator chapter={chapter} chapters={chapters}/>}
                {chapter && <Comments id={`chapter_${chapter.id}`}/>}


            </div>
        </>)
}

const ChapterNavigator = ({chapter: chapter, chapters}: { chapter: IChapter, chapters: IChapter[] }) => {
    const navigate = useNavigate();
    const {mangaSlug} = useParams();
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [nextChapter, setNextChapter] = useState<IChapter | null>(null);
    const [prevChapter, setPrevChapter] = useState<IChapter | null>(null);

    useEffect(() => {
        if (chapter && chapters) {
            setNextChapter(chapters.filter((chapter_) => chapter_.number > chapter.number).sort((a, b) => a.number - b.number)[0] || null);
            setPrevChapter(chapters.filter((chapter_) => chapter_.number < chapter.number).sort((a, b) => a.number - b.number)[0] || null);
        }
    }, [chapters, chapter]);
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    return (
        <div className="w-full mb-5 flex">
            <button className="btn w-12 h-12 " disabled={prevChapter == null}>
                <Link to={prevChapter ? `/manga/${mangaSlug}/${prevChapter.number}` : "#"} className={`w-full h-full flex justify-center items-center ${!nextChapter && "disabled"}`}><MdNavigateBefore/></Link>
            </button>

            <Link to={`/manga/${mangaSlug}`} className='btn ml-1 w-32 h-12 hidden md:flex'>المانجا</Link>

            <div className=" w-fit mx-auto flex items-center space-x-2">
                <div className="relative">
                    <div className="dropdown">
                        <div className="flex  justify-center items-center">
                            <label
                                tabIndex={0}
                                onClick={toggleDropdown}
                                className="btn bg-base-300 m-1 md:w-52 w-20 h-12 flex items-center justify-between cursor-pointer"
                            >الفصول
                            </label>

                            <label className={` btn ${isDropdownOpen ? 'transform rotate-180' : ''} `}><IoIosArrowDown/></label>
                        </div>


                        <ul tabIndex={0} className={`${
                                isDropdownOpen ? 'block' : 'hidden'
                            } dropdown-content ml-1 menu p-2 shadow bg-base-300 rounded w-52  [&>*:nth-child(odd)]:border-b [&>*:nth-child(odd)]:mb-2 `}>
                            {chapters?.map((chapter_, index) => (
                                <div
                                    key={`chapter_${chapter_.id}_${chapter_.number}`}
                                    className="max-h-[260px] overflow-y-scroll flex flex-col overflow-hidden"
                                >
                                    <button
                                        onClick={() => {
                                            navigate(`/manga/${mangaSlug}/${chapter_.number}`);
                                        }}
                                        value={chapter_.number}
                                        className={`flex justify-center items-center rounded bg-base-100 p-1`}
                                        key={index}
                                    >
                                        {chapter_.number} - الفصل

                                        <span className="ml-3 mb-1">
                                      {chapter_.short_link ? '' : <FaLock/>}
                                    </span>
                                    </button>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


           <div className="hidden md:block mr-8">
               {chapter && <ChapterControl chapter={chapter}/>}
           </div>


            <button className="btn w-12 h-12 " disabled={nextChapter == null}>
                <Link to={nextChapter ? `/manga/${mangaSlug}/${nextChapter.number}` : "#"}
                      className={`w-full h-full flex justify-center items-center ${!nextChapter && "disabled"}`}><MdNavigateNext/></Link>
            </button>
        </div>)
}

export const Image = ({src}: { src: string }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            <img className="select-none" hidden={!loaded} onLoad={(e) => {
                setLoaded(true);
            }} src={src} alt={"IMAGE OF CHAPTER"}/>
            {!loaded && <div
                className="w-full h-96 bg-base-300/20  my-0.5 rounded-box flex justify-center items-center text-2xl"
                dir="rtl">
                <div
                    className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>

            </div>}
        </>


    )
}
export default ChapterPage
