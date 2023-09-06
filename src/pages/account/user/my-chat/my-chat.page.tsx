import React, {useEffect} from "react";
import useAuth from "../../../../hooks/auth/useAuth.hook";
import soloLeveling from "../../../../assets/images/solo-leveling_.png";
import {useNavigate} from "react-router-dom";

const MyChatPage = () => {
    const {user} = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/")
    }, []);
    return (
        <div className="container mx-auto p-5 h-full mt-3 rounded-lg " dir="ltr">
            <div>
                <div className="text-center text-2xl text-error font-bold">


                </div>
                <div className="flex justify-between items-center">
                </div>
            </div>

        </div>
    )
}

export default MyChatPage
