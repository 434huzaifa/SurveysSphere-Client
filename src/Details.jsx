import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import QueryUtil from "./QueryUtil";
import { Card } from "flowbite-react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from "react";
const Details = () => {
    const [rating, setRating] = useState(1)
    const { user } = useAuth()
    const caxios = useAxios()
    const { id } = useParams()
    const location=useLocation()
    const navigate=useNavigate()
    const s_data = useQuery({
        queryKey: ['details', id],
        queryFn: async () => {
            let res = await caxios(`/getsurvey?id=${id}`)
            setRating(parseInt(res.data.isLike))
            return res.data
        },
        enabled: !!id && !!user,
    })
    const Like = (
        <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z"></path>
    );
    const Dislike = (
        <path d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H273v428h.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM112 132v364c0 17.7 14.3 32 32 32h65V100h-65c-17.7 0-32 14.3-32 32z"></path>
    );
    const customStyles = {
        itemShapes: [Like, Dislike],
        activeFillColor: ['#009664', "#D22B2B"],
        inactiveFillColor: '#a8a8a8',
    };
    const changelike=useMutation({
        mutationFn:async(data)=>{
            let res=await caxios.post(`/changelike`,data)
            return res.data
        },
        enabled: !!id && !!user,
        onSuccess:async()=>{
            await s_data.refetch()
        }
    })
    async function ChangeLike(value){
        console.log(value);
        if (user!=null) {
            setRating(value)
            changelike.mutateAsync({value:value,survey:id})
        }else{
            navigate("/login",{state:location.pathname})
        }
    }
    return (
        <div>
            <QueryUtil query={s_data}>
                <Card className="my-4">
                    <p className="text-4xl text-gray-800 font-bold">{s_data.data?.title}</p>
                    <p className="text-xl text-gray-800 ">{s_data.data?.category}</p>
                    <Rating
                        style={{ maxWidth: 80 }}
                        value={rating}
                        itemStyles={customStyles}
                        items={2}
                        spaceBetween="medium"
                        transition="zoom"
                        onChange={value=>ChangeLike(value)}
                        highlightOnlySelected
                        isRequired
                        isDisabled={changelike.isPending}
                    />
                </Card>

            </QueryUtil>

        </div>
    );
};

export default Details;