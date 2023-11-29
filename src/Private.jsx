
import useAuth from "./useAuth";

const Private = ({ children }) => {
    const {user}=useAuth()


    if (user ) {
        
            return children ;
        
    }
        return (
            <div className="flex flex-col justify-center items-center h-screen">
            <p className="w-full text-9xl font-black text-center text-red-700"> You are not allowed to access this URL </p>
            <img src="/Unauthorize.png" alt="" />
            </div>
        )
    
};

export default Private;