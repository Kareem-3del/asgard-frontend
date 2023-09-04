import adsImage from "../../assets/images/ads.png";
const sizes = {
    board: {
        width: "728px",
        height: "90px"
    },
    "box-lg": {
        width: "336px",
        height: "280px"
    },
    "box-sm": {
        width: "300px",
        height: "250px"
    },
    "wide-lg": {
        width: "600px",
        height: "160px"
    },
    "wide-sm": {
        width: "600px",
        height: "120px"
    },
    "btn-lg": {
        width: "120px",
        height: "90px"
    },
    "btn-sm": {
        width: "120px",
        height: "60px"
    },
    "bar-xs": {
        width: "88px",
        height: "31px"
    }
}

interface IProps {
    size: keyof typeof sizes
    width?: string
    height?: string
}

const AdsComponent = (options: IProps) => {

    return (
        <div style={{height: (options.height) ? options.height : sizes[options.size].height , width : (options.width)? options.width : sizes[options.size].width}} className="bg-base-300 rounded flex justify-center items-center border-primary/10 border relative z-0">

            <img src={adsImage} className="w-full h-full absolute -z-50 object-cover opacity-20" alt=""/>
            <h2 className="text-3xl opacity-50 font-semibold">اعلان </h2>
        </div>
    );
};

export default AdsComponent;
