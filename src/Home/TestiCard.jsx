import {  Card } from "flowbite-react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from "react";

const TestiCard = ({ x }) => {
    const [rating, setRating] = useState(4)
    return (
        <Card className=' lg:h-full lg:w-full bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-lg '>
            <div className="flex justify-center">
                <img src={x.image} alt={x.name} className="xl:w-36 xl:h-36 md:w-24 md:h-24 w-14 h-14  rounded-full object-cover"/>
            </div>
            <p className="text-teal-400 xl:text-5xl md:text-3xl text-2xl font-extrabold">{x.name}</p>
            <p className="text-purple-950 md:text-xl text-md font-bold">{x.email}</p>
            <div className="flex justify-center">
            <Rating
            className="md:max-w-[200px] max-w-[120px]"
                            value={rating}
                            items={5}
                            readOnly
                            onChange={setRating}
                            spaceBetween="medium"
                            transition="zoom"
                        />
            </div>
            
            <p className="text-pink-600 md:text-lg text-sm font-semibold">{x.review}</p>
        </Card>
    );
};

export default TestiCard;