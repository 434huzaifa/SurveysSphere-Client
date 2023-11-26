import { Card } from "flowbite-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
const SurveyCard = ({x}) => {
    const navigate=useNavigate()
    function SeeDetails(id) {
        navigate(`/details/${id}`)
    }
    return (
        <motion.button whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }} className="w-full">
        <Card id={x._id} onClick={()=>{SeeDetails(x._id)}}>
        <p className="text-2xl text-blue-500 font-bold">{x.title}</p>
        <p className="italic font-extralight">{String(x.description).slice(0,50)}...</p>
        <p>{moment(x.createdAt).format("MMMM Do YYYY")}</p>
    </Card>
    </motion.button>
    );
};

export default SurveyCard;