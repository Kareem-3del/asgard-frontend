import {Link} from "react-router-dom";
import "../scss/MangaChapters.scss";
import {IChapter} from "../../../interfaces/chapter.interface";
import dayjs from "dayjs";
import {HiLink} from "@react-icons/all-files/hi/HiLink";
import React, {useEffect} from "react";
import {FaCoins} from "react-icons/fa";
import {ConfirmBuyChapterModal} from "../../chapter-page/ChapterPage";
import {
    BiSelectMultiple,
    BsFillGrid3X2GapFill,
    BsSortNumericDownAlt,
    BsSortNumericUpAlt,
    FaList
} from "react-icons/all";
import {IoIosCheckbox} from "@react-icons/all-files/io/IoIosCheckbox";
import {AiFillDelete} from "@react-icons/all-files/ai/AiFillDelete";
import {deleteChapter} from "../../../services/chapter.service";
import {AxiosError, AxiosResponse} from "axios";
import {IException} from "../../../interfaces/exception.interface";
import useToaster from "../../../hooks/toast/useToaster.hook";
import useAuth from "../../../hooks/auth/useAuth.hook";

const MangaChaptersComponent = ({chapters , onDelete}: { chapters: IChapter[] , onDelete? : (chapters_deleted:{chapter : IChapter , done : boolean})=>void }) => {
    const [chapter, setChapter] = React.useState<IChapter>();
    const [boughtChapters, setBoughtChapters] = React.useState<IChapter[]>([]);
    const [selectedChapters, setSelectedChapters] = React.useState<IChapter[]>([]);
    const [sortASC, setSortASC] = React.useState<boolean>(true);
    const [selectMode, setSelectMode] = React.useState<boolean>(false);
    const [cardMode, setCardMode] = React.useState<boolean>(true);

    useEffect(() => {
        // get card mode in local storage
        let card_mode = localStorage.getItem("card_mode");
        console.log("card_mode", card_mode)
        if (card_mode) {
            setCardMode(!JSON.parse(card_mode));
        }



        chapters.sort((a, b) => {
            return a.number - b.number;
        });
        let looked_chapters = localStorage.getItem("chapters_locked");
        if (looked_chapters) {
            let looked_chapters_array = JSON.parse(looked_chapters);
            let bought_chapters = chapters.filter((chapter) => {
                return looked_chapters_array.includes(chapter.id);
            });
            setBoughtChapters(bought_chapters);
        }
    }, []);
    function handelChapterBuy() {
        localStorage.setItem("chapters_locked", JSON.stringify([...JSON.parse(localStorage.getItem("chapters_locked") || "[]"), chapter?.id]));
        setBoughtChapters([...boughtChapters, chapter as IChapter]);
    }

    function handleSort() {
        sortASC ? chapters.sort((a, b) => {
            return b.number - a.number;
        }) : chapters.sort((a, b) => {
            return a.number - b.number;
        })
        setSortASC(!sortASC);
    }

    function handleSelectMode() {
        setSelectMode(!selectMode);
    }


    function handleDeleteChapters(chaptersStatus : {chapter : IChapter , done : boolean}){
       // delete chapter from selected chapters
        if(chaptersStatus.done){
            setSelectedChapters(selectedChapters.filter((chapter)=>{
                return chapter.id !== chaptersStatus.chapter.id;
            }))
        }
        onDelete && onDelete(chaptersStatus);
    }


    return (
        <div className="h-full">
            <DeleteChaptersModal chapters={selectedChapters} onDelete={handleDeleteChapters} />
            {chapter && <ConfirmBuyChapterModal handelChapterBuy={handelChapterBuy} chapter={chapter}/>}


            <div className="w-fit bg-base-300  ml-auto rounded-xl flex justify-end p-2 space-x-2 mb-1.5 " dir="ltr">
                <button className="btn btn-xs h-8 w-8  rounded" onClick={handleSort}>
                    <span className="text-xl">
                        {
                            (sortASC) ? <BsSortNumericDownAlt/> : <BsSortNumericUpAlt/>
                        }
                    </span>
                </button>
                <button className="btn btn-xs h-8 w-8  rounded" onClick={() => {
                    setCardMode(!cardMode)
                    localStorage.setItem("card_mode", JSON.stringify(cardMode));
                }}>
                    <span className="text-xl">
                        {
                            (cardMode) ? <FaList/> : <BsFillGrid3X2GapFill/>
                        }
                    </span>
                </button>
                <button className="btn btn-xs h-8 w-8  rounded" onClick={handleSelectMode}>
                    <span className="text-xl">
                        {
                            (selectMode) ? <BiSelectMultiple/> : <IoIosCheckbox/>
                        }
                    </span>
                </button>
                {
                    selectedChapters.length > 0 &&
                    <label htmlFor="delete-chapters" className="btn btn-error btn-xs h-8 w-8 rounded">
                             <span className="text-xl ">
                                        <AiFillDelete/>
                               </span>
                    </label>
                }
            </div>
            <div className="text-primary-content w-full p-2 bg-base-300 rounded-xl h-[520px]">
                <ul dir="rtl" className={`${(cardMode) ? "grid-cols-3 " : "grid-cols-1 "} justify-start items-start max-h-full  grid rounded-lg  overflow-y-scroll`}>

                    {
                        chapters?.map((item, index) => {
                            return (
                                <ChapterCard
                                    onBuy={() => {
                                        setChapter(item)
                                    }}
                                    type={(cardMode) ? "card" : "list"}
                                    key={`chapter_${item.id}`}
                                    onSelect={(select:boolean) => {
                                        if(select) {
                                            setSelectedChapters([...selectedChapters, item])
                                        }
                                        else {
                                            setSelectedChapters(selectedChapters.filter((chapter)=>{
                                                return chapter.id != item.id;
                                            }))
                                        }
                                    }}
                                    selectMode={selectMode}
                                    isBought={boughtChapters.includes(item)}
                                    chapter={item}/>
                            )
                        })
                    }


                </ul>
            </div>

        </div>

    );
}

export default MangaChaptersComponent;


interface ChapterCardProps {
    chapter: IChapter
    className?: string,
    onBuy: () => void,
    isBought?: boolean,
    onSelect?: (e:boolean) => void
    selectMode?: boolean,
    type?: "list" | "card"
}

const ChapterCard = ({className,  type , chapter, onBuy, isBought, onSelect, selectMode}: ChapterCardProps) => {
    dayjs.locale('ar');
    const selectBoxRef = React.useRef<HTMLInputElement>(null);
    return (
        <li className={`relative z-0 ${type == "list" ? "h-16" : "h-28"} m-0.5 ml-1.5`}>
            <input  ref={selectBoxRef} type="checkbox" hidden={!selectMode} className="peer absolute top-3 left-3 z-50 "
                onChange={(e)=>{
                    onSelect && onSelect(e.target.checked)
                }}
            />
            <div
                onClick={()=>{
                    if(selectMode){
                        selectBoxRef.current?.click();
                    }
                }}
                className={`text-base-content bg-base-100 peer-checked:bg-primary transition-colors duration-300 relative h-full flex ${type == "list" ? "flex-row p-2 px-3" : "flex-col p-3"} rounded-lg  `}>
                {
                    // if chapter is from less than 1 day ago show new badge
                    (dayjs().diff(chapter.created_at, 'day') < 2) &&
                    <span className="badge badge-primary badge-xs animate-pulse top-2 left-2 absolute">
                </span>
                }
              <div className="w-fit flex-none">
                  <Link to={`./${chapter.number}`} className="visited:text-accent text-xl w-fit">

                <span className=" font-bold ">
                    الفصل
                    <span className="mr-2">{chapter.number}</span>
                </span>

                  </Link>
                  <h2 className="-mt-1">{chapter.title}</h2>
              </div>


                <div className={`flex w-full   ${type == "list" ? "mr-5 justify-center  items-center" : "mt-auto  items-end h-fit "}`}>
                    {
                        (chapter.short_link && !isBought) &&
                        <div className="justify-center flex space-x-2 " dir="ltr">
                            <Link to={chapter.short_link.redirect_url} className="btn btn-sm rounded text-xl">
                                <HiLink/>
                            </Link>

                            <label htmlFor="buy-chapter" onClick={onBuy} className="btn btn-sm rounded text-lg">
                                <FaCoins/>
                            </label>
                        </div>
                    }


                    <div className="mr-auto mt-auto">
                        {dayjs(chapter.created_at).fromNow()}
                    </div>
                </div>
            </div>

        </li>
    )
}


const DeleteChaptersModal = ({chapters , onDelete}: { chapters: IChapter[] , onDelete? : (chapterStatus : {chapter : IChapter , done : boolean})=>void}) => {
    const toaster = useToaster();
    const handleDeleteChapter = () => {

       chapters.forEach((chapter)=>{
           deleteChapter(chapter.id).then((res: AxiosResponse<IException>) => {
               toaster.createToast({
                   message: res.data.message as string,
                   type: "success"
               });
                onDelete && onDelete({chapter : chapter , done : true});

           }).catch((err: AxiosError<IException>) => {
               toaster.createToast({
                   message: err.response?.data.message as string || err.message,
                   type: "error"
               });
                onDelete && onDelete({chapter : chapter , done : false});
           });
       })
    }


    return (
        <>
            <input type="checkbox" id="delete-chapters" className="modal-toggle"/>
            <div className="modal" dir="rtl">
                <div className="modal-box">
                    <div className="font-bold text-lg text-error text-center">
                        <h2>   هل انت متأكد من حذف ؟</h2>
                     <ul className="space-x-2" dir="ltr">
                         {
                             chapters.map((chapter)=>{
                                 return <li key={`delete_chapter_${chapter.id}`} className="badge"> {chapter.number} <span className="ml-1">الفصل</span> </li>
                             })
                         }
                     </ul>

                    </div>
                    <div className="modal-action" dir="ltr">
                        <label htmlFor="delete-chapters" className="btn">الغاء</label>
                        <button
                            onClick={handleDeleteChapter}
                            className="btn btn-error">حذف
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
