import { Card } from "flowbite-react";
import moment from "moment";

const SurveyCard = ({x}) => {
    return (
        <Card >
        <p className="text-2xl text-blue-500 font-bold">{x.title}</p>
        <p className="italic font-extralight">{String(x.description).slice(0,50)}...</p>
        <p>{moment(x.createdAt).format("MMMM Do YYYY")}</p>
    </Card>
    );
};

export default SurveyCard;