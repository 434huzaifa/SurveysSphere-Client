import { Spinner } from "flowbite-react";
import Error from "./Error";

const QueryUtil = ({query,children}) => {
    if (query.isLoading) {
        return <Spinner aria-label="Center-aligned Extra large spinner example p-2" size="xl" ></Spinner>
    }else if(query.isError){
        return <Error>{query.error?.response?.data || query.error.message}</Error>
    }
    else if(query.data==null || query?.data.length==0){
        return <Error>No Data</Error>
    }else if(query.isSuccess){
        return <>{children}</>

    }
    return <Error>Something Wrong</Error>
    
};

export default QueryUtil;