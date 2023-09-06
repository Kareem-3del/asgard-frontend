import useAuth from "../../../../hooks/auth/useAuth.hook";
import {IManga} from "../../../../interfaces/manga.interface";
import MangaSlideCardV3 from "../../../manga-page/manga-slider/manga-slide.card";
const MyFavoritesPage = () => {
    const {user} = useAuth();
    return (
        <div className="w-full">
            {
                user?.following && user.following.map((manga : IManga) => {
                    return <div key={manga.id}>{manga.title}</div>
                })
            }
            <div className="w-full p-2 h-full flex flex-wrap content-start">
                <div className="w-full px-2 mb-2 h-16 flex items-center">
                    <h1 className="badge p-7 text-2xl font-bold">المفضلة</h1>
                </div>
                {
                    user?.manga_favorite && user.manga_favorite.map((manga : IManga) => {
                        return    <div key={`manga_fav_${manga.id}`} className="w-96 h-fit" dir="ltr">
                            <MangaSlideCardV3 manga={manga} />
                        </div>
                    })
                }
                {
                    // if no manga in favorite
                    !user?.manga_favorite && <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-2xl font-bold">لا يوجد مفضلة</h1>
                    </div>
                }
            </div>
        </div>
    );
}

export default MyFavoritesPage;
