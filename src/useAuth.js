import { useContext } from "react";
import { myContext } from "./Auth";

const useAuth = () => {
    const auth=useContext(myContext)
    return auth;
};

export default useAuth;