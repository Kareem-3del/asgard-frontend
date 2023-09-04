import React from "react";
import {IoNotifications} from "@react-icons/all-files/io5/IoNotifications";
import {IoNewspaperSharp} from "@react-icons/all-files/io5/IoNewspaperSharp";
import soloLeveling from "../../assets/images/solo-leveling_.png";
import {RiCloseCircleFill} from "@react-icons/all-files/ri/RiCloseCircleFill";
import {Link} from "react-router-dom";
import {SiGooglemessages} from "@react-icons/all-files/si/SiGooglemessages";
import {IoNotificationsOffSharp} from "react-icons/all";
import {useAppSelector} from "../../hooks/redux";

const NotificationBtnComponent = () => {
    const [notification, setNotification] = React.useState([0, 1, 2, 3]);
    const {isLogin} = useAppSelector(((state) => state.auth));
    return (
        <div className="dropdown   z-10" dir="ltr">
            <button className={`btn btn-ghost btn-circle ${!isLogin ? "hidden" : ""}`} disabled={!isLogin}>
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                    <span className={`badge badge-xs badge-primary indicator-item ${!isLogin ? "hidden" : ""}`}></span>
                </div>
            </button>

            <ul tabIndex={0}
                className="dropdown-content   menu p-1 shadow bg-base-200 rounded-sm mt-3 w-72 max-h-[400px] overflow-x-hidden overflow-y-scroll flex-col flex-nowrap space-y-2">
                {/*         {
                    notification.map((item, index) => <NotificationCardMessage key={`notification_${index}`}/>)

                }
                {
                    notification.map((item, index) => <NotificationCardNewChapter key={`notification_${index}`} chapterNumber={1} isRead={false} mangaName={"SOLO LEVELING"} mangaImage={soloLeveling}/>)

                }*/}

                <p className="w-full bg-base-300 p-3 text-center flex justify-center items-center space-x-3 rounded-lg" dir="ltr">
                    <span className="mr-2"><IoNotificationsOffSharp/></span>

                    لا يوجد اشعارات حاليا

                </p>
            </ul>
        </div>
    )

}


const NotificationCardMessage = () => {
    return (
        <div className="bg-base-200 rounded-sm h-full p-2 flex relative flex-none" dir="rtl">
            <div className="flex">
                <div className="w-14  ml-3 text-4xl flex justify-center items-center">
                    <SiGooglemessages/>
                </div>
                <div className="text-xs my-auto">
                    <Link to="/chat/1#1a-8wqe956e-qe78w-qwe"
                          className="font-semibold text-lg hover:text-primary duration-300">رسالة جديدة</Link>
                    <p className=""> من <span>Kareem#4689</span></p>
                    <p className="text-base-content/70">اهلا ما موعد نزول الفصل القادم...</p>
                </div>
            </div>
            <div className="flex-none absolute left-2 top-2">
                <RiCloseCircleFill/>
            </div>
        </div>
    )
}

interface NotificationCardNewChapterProps {
    mangaName: string,
    mangaImage: string,
    chapterNumber: number,
    isRead: boolean
}

const NotificationCardNewChapter = (props: NotificationCardNewChapterProps) => {
    return (
        <li className={`rounded-sm p-2 flex relative flex-none ${(props.isRead) ? "bg-base-300" : "bg-base-200"}`}
            dir="rtl">
            <div className="flex">
                <div className="w-14 h-full ml-3">
                    <img src={props.mangaImage || soloLeveling} className="w-full h-full object-cover" alt="MangaName"/>
                </div>
                <div className="text-xs my-auto">
                    <Link className="font-semibold text-lg hover:text-primary duration-300"
                          to="/manga/1/1">{props.mangaName}</Link>
                    <p>الفصل <span className="font-bold">{props.chapterNumber}</span> حصريا الان علي موقعنا</p>
                </div>
            </div>
            <div className="flex-none absolute right-0 top-0">
                <RiCloseCircleFill/>
            </div>
        </li>
    )
}
export default NotificationBtnComponent
