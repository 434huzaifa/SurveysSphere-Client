import { Button } from "flowbite-react";
import { Link, useRouteError } from "react-router-dom";
const EelementError = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <div className="w-screen h-screen">
        {
            error?.status==404 && <div className="flex flex-col justify-center items-center w-full h-full">
                <Button className="mt-4 h-24 w-80"><Link className="font-bold text-5xl" to="/">HOME</Link></Button>
                <img src="/404.png" alt="" />
            </div>
        }
    </div>
    );
};

export default EelementError;