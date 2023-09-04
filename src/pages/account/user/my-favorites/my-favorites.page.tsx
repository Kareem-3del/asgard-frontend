import useAuth from "../../../../hooks/auth/useAuth.hook";
import {IManga} from "../../../../interfaces/manga.interface";
import { useNavigate } from "react-router-dom";
const MyFavoritesPage = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    if(!user){
        // redirect to login page
        navigate("auth/login");
    }
    return (
        <div>
            {
                user?.following && user.following.map((manga : IManga) => {
                    return <div key={manga.id}>{manga.title}</div>
                })
            }
            <div className="text-center justify-center items-center flex p-8 text-xl w-full">
                الخدمة غير متوفرة حاليا
            </div>
        </div>
    );
}

export default MyFavoritesPage;
