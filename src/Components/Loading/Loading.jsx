import Lottie from "lottie-react";
import animationData from "../../Lottie/loading.json";

const Loading = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen justify-center items-center ">
                <div>
                    <p className="text-4xl">Loading...</p>
                </div>
                <Lottie animationData={animationData} />
            </div>
        </div>
    );
};

export default Loading;
