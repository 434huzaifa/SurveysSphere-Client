import {  Card } from "flowbite-react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from "react";

const TestiCard = ({ x }) => {
    const [rating, setRating] = useState(4)
    return (
        <Card className=' h-full w-full bg-[rgba(255, 255, 255, 0.2)] backdrop-blur-lg '>
            <div className="flex justify-center">
                <img src={x.image} alt={x.name} className="w-36 h-36 rounded-full object-cover"/>
            </div>
            <p className="text-teal-400 text-5xl font-extrabold">{x.name}</p>
            <p className="text-purple-950 text-xl font-bold">{x.email}</p>
            <div className="flex justify-center">
            <Rating
                            style={{ maxWidth: 200 }}
                            value={rating}
                            items={5}
                            readOnly
                            onChange={setRating}
                            spaceBetween="medium"
                            transition="zoom"
                        />
            </div>
            
            <p className="text-pink-600 text-lg font-semibold">{x.review}</p>
        </Card>
    );
};

export default TestiCard;