import {motion} from "framer-motion";
import React from "react";
import {Outlet, useLocation} from "react-router-dom";

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    }
};

const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.5
};

const AnimationLayout = () => {
    const {pathname} = useLocation();
    return (
        <PageLayout>
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Outlet/>
            </motion.div>
        </PageLayout>
    );
};


const PageLayout = ({ children } : any) => children;
export default AnimationLayout;
