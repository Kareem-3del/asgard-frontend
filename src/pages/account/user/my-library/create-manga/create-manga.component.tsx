import {RiFileUploadFill} from "@react-icons/all-files/ri/RiFileUploadFill";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {motion} from "framer-motion";
import noImage from "../../../../../assets/images/no-image.png";
import {BsCheckLg} from "react-icons/bs";
import {BiError} from "react-icons/bi";
import useManga from "../../../../../hooks/manga/useManga.hook";
import {IGenre} from "../../../../../interfaces/genre.interface";

const CreateMangaComponent = () => {
    const [cover, setCover] = React.useState<File>();
    const [background, setBackground] = React.useState<File>();
    const [name, setName] = React.useState<string>();
    const [story, setStory] = React.useState<string>();
    const [genres, setGenres] = React.useState<number[]>([]);
    const [status, setStatus] = React.useState<string>();
    const [type, setType] = React.useState<string>();
    const [liveCover, setLiveCover] = React.useState<string>();
    const [liveBackground, setLiveBackground] = React.useState<string>();
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const CoverInputRef = React.useRef<HTMLInputElement>(null);
    const BackgroundInputRef = React.useRef<HTMLInputElement>(null);


    useEffect(() => {

        CoverInputRef.current?.addEventListener('change', (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                setCover(file);
                setLiveCover(URL.createObjectURL(file));
            }
        })
        BackgroundInputRef.current?.addEventListener('change', (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                setBackground(file);
                setLiveBackground(URL.createObjectURL(file));
            }
        });
    }, [])
    const changeTab = (index: number) => {
        setActiveTab(index);
    }
    const {createManga} = useManga();
    const uploadManga = () => {
        if (!name || !story || !status || !type || !cover || !background || !genres.length) {
            return;
        }
        createManga({title: name, story, genres, status, type, cover, background}).then((res) => {
            console.log(res);
        });
    }
    return (
        <div className="w-[42rem] h-96 bg-base-300 pr-5 " dir="ltr">
            <input type="file" ref={CoverInputRef} hidden accept="image/*"/>
            <input type="file" ref={BackgroundInputRef} hidden accept="image/*"/>

            <div className="flex h-full">


                <div className="w-full flex flex-col h-full items-center justify-center">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                        key={activeTab} className="w-full h-full p-2 flex">
                        {activeTab === 0 && <SelectImage image={liveCover} onClickBtn={() => {
                            CoverInputRef.current?.click()
                        }} label="صورة الغلاف"/>}
                        {activeTab === 1 && <SelectImage image={liveBackground} onClickBtn={() => {
                            BackgroundInputRef.current?.click()
                        }} label="صورة الخلفية"/>}
                        {activeTab === 2 && <InfoManga name={name} story={story} callback={(name, story) => {
                            setName(name);
                            setStory(story);
                        }}/>}
                        {activeTab === 3 && <DetailsManga type={type} genres={genres} status={status}
                                                          callback={(type, status, genres) => {
                                                              console.log(type, status, genres)
                                                              setType(type);
                                                              setStatus(status);
                                                              setGenres(genres);
                                                          }}/>}
                        {activeTab === 4 && <ConfirmManga manga={
                            {
                                name: !!(name?.length && name.length > 0),
                                story: !!story?.length && story.length > 0,
                                type: !!(type?.length && type.length > 0),
                                status: !!(status?.length && status.length > 0),
                                genres: !!(genres?.length ?? genres.length > 0),
                                cover: !!cover,
                                background: !!background
                            }} callback={uploadManga} isUploading={loading}/>

                        }

                    </motion.div>


                </div>

                <ul className="steps steps-vertical  h-full flex-none overflow-hidden">
                    <li className={`step ${(activeTab >= 0) ? "step-primary" : ""}`} onClick={() => {
                        changeTab(0)
                    }}>
                        <span className={`w-32 btn ${(activeTab >= 0 ? " btn-primary" : "")}`}> صورة الغلاف</span>
                    </li>
                    <li className={`step ${(activeTab >= 1) ? "step-primary" : ""}`} onClick={() => {
                        changeTab(1)
                    }}>
                        <span className={`w-32 btn ${(activeTab >= 1 ? " btn-primary" : "")}`}> صورة الخلفية</span>
                    </li>
                    <li className={`step ${(activeTab >= 2) ? "step-primary" : ""}`} onClick={() => {
                        changeTab(2)
                    }}>
                        <span className={`w-32 btn ${(activeTab >= 2 ? " btn-primary" : "")}`}> البيانات</span>
                    </li>
                    <li className={`step ${(activeTab >= 3) ? "step-primary" : ""}`} onClick={() => {
                        changeTab(3)
                    }}>
                        <span className={`w-32 btn ${(activeTab >= 3 ? " btn-primary" : "")}`}> التفاصيل</span>
                    </li>
                    <li className={`step ${(activeTab >= 4) ? "step-primary" : ""}`} onClick={() => {
                        changeTab(4)
                    }}>
                        <span className={`w-32 btn ${(activeTab >= 4 ? " btn-primary" : "")}`}> تاكيد العملية</span>
                    </li>
                </ul>


            </div>

        </div>
    )
}

const SelectImage = ({onClickBtn, label, image}: { onClickBtn?: () => void, label: string, image?: string }) => {
    return (
        <div className="w-full flex-col h-full relative flex group z-0">
            <h1 className="p-2 absolute top-0 bg-base-300  mb-2 text-primary text-lg z-10 font-semibold  top-0 w-full text-center ">{label}</h1>
            <div className="h-full block avatar w-full rounded-lg">
                <img className="w-full h-full" src={image || noImage} alt="Manga-IMAGE"/>
            </div>
            <div
                className="absolute duration-300  bg-base-300/80 group-hover:opacity-100 opacity-0 w-full h-full flex items-center justify-center">
                <button onClick={onClickBtn} className=" btn btn-outline  rounded-full btn-wide">
                    اضافة صورة
                    <span className=" text-2xl mb-0.5"><RiFileUploadFill/></span>
                </button>
            </div>
        </div>
    )
}

interface InfoMangaProps {
    name?: string;
    story?: string;
    callback?: (name: string, story: string) => void;
}

const InfoManga = (props: InfoMangaProps) => {
    const [name, setName] = React.useState<string>(props.name || "");
    const [story, setStory] = React.useState<string>(props.story || "");
    useEffect(() => {
        props.callback?.(name, story);
    }, [name, story])
    return (
        <div className="w-full h-full flex flex-col justify-center items-center" dir="rtl">
            <div className="w-full flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                    <label className="label">
                        <span className="label-text">اسم المانجا</span>
                    </label>
                    <input type="text" onChange={(e) => {
                        setName((e.target as HTMLInputElement).value);
                    }} defaultValue={props.name} className="input input-bordered"/>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="label">
                        <span className="label-text">القصة</span>
                    </label>
                    <textarea onChange={(e) => {
                        setStory((e.target as HTMLTextAreaElement).value);
                    }} defaultValue={props.story} className="textarea h-48 textarea-bordered"/>
                </div>


            </div>
        </div>
    )
}
import genresService from "../../../../../services/genre.service";
import {AxiosResponse} from "axios";
import {MangaTypesEnum, StatusTypeEnum} from "../../../../../interfaces/manga.interface";

interface DetailsMangaProps {
    type?: string,
    status?: string,
    genres?: number[]
    callback?: (type: string, status: string, genres: number[]) => void
}

export const DetailsManga = (props: DetailsMangaProps) => {
    const [type, setType] = useState<string | null>(MangaTypesEnum[props.type as any] || "Manga")
    const [status, setStatus] = useState<string | null>(StatusTypeEnum[props.status as any] || "Ongoing")
    const [genres, setGenres] = useState<number[]>(props.genres || [])

    useEffect(() => {
        props.callback && props.callback((type || ""), status || "", genres)
    }, [type, status, genres])

    const [genresFetch, setGenreFetch] = useState<IGenre[]>([])
    useEffect(() => {
        genresService.findAll().then((res: AxiosResponse<IGenre[]>) => {
            setGenreFetch(res.data);
        })
    },[])

    const selectGenre = (genre: number, event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setGenres([...genres, genre])
        } else {
            setGenres(genres.filter(g => g !== genre))
        }
    }

    const isGenreSelected = (genre: number) => {
        return genres.includes(genre)
    }
    return (
        <div className="w-full h-full flex flex-col justify-center items-center" dir="rtl">
            <div className="w-full flex flex-col space-y-3">
                <div className="flex flex-col space-y-1">
                    <label className="label">
                        <span className="label-text">النوع</span>
                    </label>
                    <select className="select select-bordered w-full "
                            onChange={(e: SyntheticEvent<HTMLSelectElement>) => {
                                setType(e.currentTarget.value)
                            }}>
                        <option value="Manga" selected={type === "Manga"}>مانجا</option>
                        <option value="Manhwa" selected={type === "Manhwa"}>مانها</option>
                        <option value="Manhua" selected={type === "Manhua"}>مانهوا</option>
                        <option value="Webtoon" selected={type === "Webtoon"}>ويب تون</option>
                        <option value="Novel" selected={type === "Novel"}>رواية</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="label">
                        <span className="label-text">الحالة</span>
                    </label>
                    <select  className="select select-bordered w-full" onChange={(e) => {
                        setStatus(e.currentTarget.value)
                    }}>
                        <option value="Ongoing" selected={status == "0"}>مستمر</option>
                        <option value="Stopped" selected={status == "1"}>متوقف</option>
                        <option value="Finished" selected={status == "2"}>منتهي</option>
                    </select>
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="label">
                        <span className="label-text">التصنيفات</span>
                    </label>
                    <div className="flex space-x-2 flex-wrap w-full justify-center" dir="ltr">
                        {
                            genresFetch.map((genre, index) => {

                                return (
                                    <label className="mb-2">
                                        <input onChange={(event) => {
                                            selectGenre(genre.id, event)
                                        }} checked={isGenreSelected(genre.id)} type="checkbox" hidden className="peer"/>
                                        <span className="label-text badge peer-checked:badge-primary">{genre.name}</span>
                                    </label>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

interface ConfirmMangaProps {
    manga: {
        name: boolean,
        story: boolean,
        type: boolean,
        status: boolean,
        genres: boolean,
        cover: boolean,
        background: boolean,
    }
    callback?: () => void
    isUploading?: boolean
}

const ConfirmManga = (props: ConfirmMangaProps) => {
    return (

        <div className="w-full h-full mr-auto" dir="rtl">
            <div className="flex h-full flex flex-col">
                <div className="px-8 h-full justify-center flex flex-col w-full ">
                    <ul className="space-y-3 text-lg rounded flex  items-center justify-between">
                        <li>
                            <div
                                className={`flex  items-center  ${(props.manga.cover) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">صورة الغلاف</span>
                                <span>{(props.manga.cover) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>
                            <div
                                className={`flex  items-center  ${(props.manga.background) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">صورة الخلفية</span>

                                <span>{(props.manga.background) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className={`flex  items-center  ${(props.manga.name) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">اسم المانجا</span>
                                <span>{(props.manga.name) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>
                            <div
                                className={`flex  items-center  ${(props.manga.story) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">قصة المانجا</span>
                                <span>{(props.manga.story) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>
                        </li>

                    </ul>
                    <ul className="space-y-3 text-lg  rounded flex  items-center justify-between">
                        <li>
                            <div
                                className={`flex  items-center  ${(props.manga.genres) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">التصنيفات</span>
                                <span>{(props.manga.genres) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>

                            <div
                                className={`flex  items-center  ${(props.manga.background) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">السرفر متاح </span>
                                <span>{(props.manga.background) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>
                        </li>
                        <li>
                            <div
                                className={`flex  items-center  ${(props.manga.type) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">النوع</span>
                                <span>{(props.manga.type) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>
                            <div
                                className={`flex  items-center  ${(props.manga.status) ? "text-success" : "text-error"}`}>
                                <span className="ml-2 w-28">الحالة</span>
                                <span>{(props.manga.status) ? <BsCheckLg/> : <BiError/>}</span>
                            </div>

                        </li>
                    </ul>
                </div>
                <div
                    className=" mt-auto h-fit  mr-2  flex flex-col space-y-3 justify-end items-center p-3 w-full rounded">
                    <button onClick={props.callback} className={`btn w-full ${(props.isUploading) ? " loading" : ""}`}
                            dir="ltr">اضافة العمل
                    </button>
                </div>

            </div>
        </div>
    )

}


export default CreateMangaComponent
