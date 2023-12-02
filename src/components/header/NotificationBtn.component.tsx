import {useEffect, useState} from "react";
import soloLeveling from "../../assets/images/solo-leveling_.png";
import {RiCloseCircleFill} from "@react-icons/all-files/ri/RiCloseCircleFill";
import {Link} from "react-router-dom";
import {SiGooglemessages} from "@react-icons/all-files/si/SiGooglemessages";
import {IoNotificationsOffSharp} from "react-icons/all";
import {INotification} from "../../interfaces/notification.interface";
import {IChp} from "../../pages/account/admin/bin-admin/ChapterList";
import useAuth from "../../hooks/auth/useAuth.hook";
import service from "../../services/auth.service";
import useToaster from "../../hooks/toast/useToaster.hook";

const NotificationBtnComponent = () => {
    const [notification, setNotification] = useState<INotification[]>([]);
    const toaster = useToaster()
    const {isLogin} = useAuth()
    useEffect(() => {
        service.getNotifications().then(res => {
            setNotification(res)
        })
    }, []);

    function handleDeleteNotification(notificationId:number) {
        service.deleteNotification(notificationId).then(res=>{
            setNotification(notification.filter(item=>item.id !== notificationId))
            toaster.createToast({
                message: "تم حذف الاشعار بنجاح",
                type: "success"
            })
        }).catch(err=>{
            toaster.createToast({
                message: "حدث خطأ اثناء حذف الاشعار",
                type: "error"
            })
        })
    }
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
            <div className='dropdown-content bg-base-300 rounded-lg rounded-t-sm  overflow-x-hidden   p-2'>
                <ul tabIndex={0}
                    className="  max-h-[420px] overflow-y-scroll p-2 shadow  mt-3 w-72  flex-col flex-nowrap space-y-1">
                    {

                        notification.map((item, index) => {
                            if (item.chapter) {
                                return <NotificationCardNewChapter
                                    onDelete={()=>{
                                        handleDeleteNotification(item.id)
                                    }}
                                    key={`notification_${index}`} chapter={item.chapter}
                                                                   isRead={false}/>
                            }
                        })
                    }
                    {
                        notification.length === 0 &&
                        <p className="w-full bg-base-300 p-3 text-center flex justify-center items-center space-x-3 rounded-lg"
                           dir="ltr">
                            <span className="mr-2"><IoNotificationsOffSharp/></span>

                            لا يوجد اشعارات حاليا

                        </p>
                    }
                </ul>
            </div>

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
const NotificationCardNewChapter = ({chapter, isRead , onDelete}: { chapter: IChp, isRead: boolean , onDelete: ()=>void }) => {
    return (
        <li className={` h-20 flex relative`}
            dir="ltr">
            <div className="flex h-full w-full">
                <div className="w-14 h-20 flex-none ">
                    <img src={chapter.manga.cover_url} className="w-full h-full object-cover rounded-lg  rounded-r-sm" alt="MangaName"/>
                </div>
                <div className={`w-full rounded-lg ml-1 rounded-l-sm ${(isRead) ? "bg-black/20" : "bg-base-100"}`}>
                  <div className="flex justify-between items-center">
                      <Link className="text-xl capitalize font-bold p-3 pb-0 hover:text-primary duration-300"
                            to={`/manga/${chapter.manga.slug}/${chapter.number}`}>{chapter.manga.title}</Link>

                      <div className="btn btn-xs w-6 h-6 rounded-full p-0 mb-2" onClick={onDelete}>
                          <RiCloseCircleFill/>
                      </div>
                  </div>

                    <p className="text-sm text-right w-full px-2.5">
                        <span className="font-bold text-primary"> الفصل </span>
                        <span className="font-bold text-primary">{chapter.number} </span>
                        حصريا الان علي موقعنا
                    </p>
                </div>
            </div>

        </li>
    )
}
export default NotificationBtnComponent
