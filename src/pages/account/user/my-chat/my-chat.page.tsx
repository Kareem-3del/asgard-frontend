import React from "react";
import useAuth from "../../../../hooks/auth/useAuth.hook";
import soloLeveling from "../../../../assets/images/solo-leveling_.png";
const MyChatPage = () => {
    const {user} = useAuth();
    return (
        <div className="container mx-auto p-5 h-full mt-3 rounded-lg " dir="ltr">
            <div>
                <div className="text-center text-2xl font-bold">
                    لا يوجد لديك اي رسائل
                </div>
                <div className="flex justify-between items-center">
                </div>
            </div>

        </div>
    )
}

export default MyChatPage
