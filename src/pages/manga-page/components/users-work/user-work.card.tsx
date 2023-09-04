import soloLeveling from "../../../../assets/images/solo-leveling_.png";
import {Link} from "react-router-dom";
import {IUser} from "../../../../interfaces/user.interface";

const UserWorkCard = ({user}:{user : IUser}) => {

    return (
        <Link to={`/user/${user.id}`} className=" flex h-20 justify-center relative items-center w-72 hover:brightness-[0.8] transition-all duration-300" dir="rtl">
            <figure className="w-20 h-20  relative flex-none">
                <img className="w-full h-full rounded-full object-cover" src={user.avatar_url||soloLeveling} alt=""/>
            </figure>
            <span className="absolute bg-base-300 h-16 w-20 right-4 -z-50"></span>
            <div dir="ltr" className="bg-base-300 w-full h-16 rounded-lg flex justify-center px-2 flex-col">
                <h1 className=" ml-auto title text-2xl truncate font-semibold w-48 text-center">{user.username}</h1>
                <h2 className="mx-auto">{user.role_name}</h2>
            </div>
        </Link>)
}

export default UserWorkCard
