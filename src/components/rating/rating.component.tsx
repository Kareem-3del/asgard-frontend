import {useEffect, useState} from "react";
import service from "../../services/manga.service";
import useAuth from "../../hooks/auth/useAuth.hook";
import useToaster from "../../hooks/toast/useToaster.hook";
import {AxiosError} from "axios";
import {IException} from "../../interfaces/exception.interface";
import {IManga} from "../../interfaces/manga.interface";
import {isObject} from "formik";

interface RatingProps {
    disabled: boolean
    manga: IManga,
    show_user_rate?: boolean,
    className?: string,
    handleChangeRate?: (rate: number) => void,
    star_className?: string
}

export function Rating(props: RatingProps) {
    const {user} = useAuth()
    const [star_className, setStar_className] = useState(props.star_className)
    const toaster = useToaster()
    const [rate, setRate] = useState(props.manga.rating);
    const stars = []

    useEffect(() => {
        if(!props.show_user_rate) return;
        // if user.id in manga.rates change rate to rate of user
        if (props.manga?.rates && user) {
            const userRate = props.manga.rates?.find((item) => item.user?.id === user?.id)
            if (userRate) {
                setStar_className(star_className + " bg-orange-500")
                setRate(userRate.rate)
            }
        }
    }, [props.manga,user]);

    function handleRatingChange(rate: number) {
        if (props.disabled) return;
        if (!user) {
            toaster.createToast({
                message: "يجب تسجيل الدخول لتقيم المانجا",
                type: "warning"
            })
            return;
        }



        service.rateMangaAPI(props.manga?.id, rate).then((e) => {
            toaster.createToast({
                message: "تم تقيم المانجا",
                type: "success"
            })
            setStar_className(star_className + " bg-orange-500")
            props.handleChangeRate && props.handleChangeRate(rate)

        }).catch((e:AxiosError<IException>)=>{
            toaster.createToast({
                message : e.response?.data?.message as string || "حدث خطاء ما",
                type:"error"
            })
        })
        setRate(rate)
    }

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <input
                key={`rating_${props.manga?.id}_star_${i}`}
                className={`mask mask-star-2 bg-orange-400  ${star_className} ${props.disabled ? "cursor-default" : "cursor-pointer"}`}
                type="radio"
                name={`rating ${props.manga?.id}`}
                value={i}
                disabled={(props.disabled || !props.manga?.id)}
                checked={i === rate}
                onChange={() => handleRatingChange(i)}
            />
        );
    }


    return (
        <div>
            <div className={`rating ${props?.className}`}>
                {stars}
            </div>
        </div>
    )
}