
import { Spinner } from "flowbite-react";
import useAuth from "./useAuth";

const Private = ({ children, permission }) => {
    const { user, role,loading } = useAuth()
    if (loading) {
        return(
            <div className="w-full min-h-[70vh]">
                <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner>
            </div>
        )
    }
    if (user) {
        if ( permission && permission.includes(role)) {
            return children;
        }
    }
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <p className="w-full text-9xl font-black text-center text-red-700"> You are not allowed to access this URL </p>
                <img src="/Unauthorize.webp" alt="" />
            </div>
        )
    
    

};

export default Private;