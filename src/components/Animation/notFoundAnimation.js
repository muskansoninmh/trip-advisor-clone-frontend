import React from "react";
import Lottie from "react-lottie";
import * as notFound from "./89900-404-error-fixing.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};
function notFoundAnimation() {
    console.log("Animation");
    return (
        <div
            style={{
                alignItems: "center",

            }}
        >
            <Lottie
                options={defaultOptions}
                height={"400px"}
                width={"400px"}
                justify={"flex-end"}
            ></Lottie>
        </div>
    );
};

export default notFoundAnimation;