import { Card } from "flowbite-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { AiOutlineDislike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { MdOutlineHowToVote } from "react-icons/md";
const SurveyCard = ({ x }) => {
    const navigate = useNavigate()
    function SeeDetails(id) {
        navigate(`/details/${id}`)
    }
    return (
        <motion.button whileHover={{ scale: 1.1,zIndex:10 }}
            whileTap={{ scale: 0.9 }} className="w-full h-[300px] relative">
            <Card id={x._id} onClick={() => { SeeDetails(x._id) }} className="w-full h-full">
                    <p className="lg:text-2xl text-md text-blue-500 font-bold">{x.title}</p>
                    <p className="italic font-extralight">{String(x.description).slice(0, 40)}...</p>
                    <p className="italic font-bold text-red-400">{moment(x.expire).format("MMMM Do YYYY")}</p>
                <div className=" flex w-full justify-between items-end absolute bottom-2 left-0 right-0 px-6">
                    <div className="flex items-center gap-1 text-lg"><AiOutlineLike />{x.like}</div>
                    <div className="flex items-center gap-1 text-lg"><AiOutlineDislike />{x.dislike}</div>
                    <div className="flex items-center gap-1 text-lg"><AiOutlineComment />{x.totalcomment}</div>
                    <div className="flex items-center gap-1 text-lg"><MdOutlineHowToVote />{x.totalvote}</div>
                </div>
            </Card>
        </motion.button>
    );
};

export default SurveyCard;