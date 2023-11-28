import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";
import Error from "../Error";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import SurveyCard from "../SurveyCard";
import { Spinner } from "flowbite-react";
const Latest = () => {
    const caxios = useAxios()
    const latest = useQuery({
        queryKey: ['latest'],
        queryFn: async () => {
            let res = await caxios.get("/latestsurvey")
            return res.data
        }
    })
    return (
        <div className="mt-4">
            <p className="rounded-md p-2 text-center text-xl font-bold bg-orange-500 text-white">Latest Surveys</p>
            {
                latest.isLoading ? <Spinner aria-label="Center-aligned Extra large spinner example" size="xl" ></Spinner>
                    :
                    latest.isSuccess ?
                        latest.data?.length == 0 ?
                            <Error>There is no data</Error>
                            :
                            <>

                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    freeMode={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[FreeMode, Pagination]}
                                    className="mySwiper mt-4"
                                >
                                    {
                                        latest.data.map((x, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <SurveyCard x={x}></SurveyCard>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

                                </Swiper>

                            </>


                        :
                        <Error>Failed to load data</Error>

            }
        </div>
    );
};

export default Latest;