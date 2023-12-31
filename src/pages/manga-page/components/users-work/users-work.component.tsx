import UserWorkCard from "./user-work.card";
import {IUser} from "../../../../interfaces/user.interface";

const UsersWorkComponent =({users} : {users? : IUser[]})=>{

    return(
        <>
            <div className="flex overflow-y-scroll px-2 w-full space-x-3 mt-2 justify-center bg-base-300 h-24 rounded-xl items-center">
                {
                    users?.map((user,index)=>{
                        return <UserWorkCard user={user} key={index}/>
                    })
                }

                {
                    users?.length === 0 && <div className="flex justify-center items-center w-full bg-base-300 p-5">
                        <h1 className="text-xl">لا يعمل احد حاليا علي هذا العمل</h1>
                    </div>
                }
            </div>

        </>)
}

export default UsersWorkComponent
