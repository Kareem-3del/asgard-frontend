import soloLeveling from "../../../../assets/images/solo-leveling_.png";
import {Link} from "react-router-dom";
import {IUser} from "../../../../interfaces/user.interface";

const UserWorkCard = ({user}:{user : IUser}) => {

    return (
        <Link to={`/user/${user.id}`}
              className="flex bg-base-100 p-2 rounded-xl relative w-52 hover:brightness-[0.8] transition-all duration-300" dir="rtl">

            <div dir="ltr" className=" w-full h-12 rounded-lg flex justify-center px-2 flex-col">
                <h1 className="auto title text-2xl truncate font-semibold  text-center">{user.username}</h1>
            </div>
            <figure className="h-full w-12 flex-none relative">
                <img className="h-12 w-12 rounded-lg object-cover" src={user.avatar_url ||soloLeveling} alt=""/>
            </figure>
        </Link>)
}

export default UserWorkCard
