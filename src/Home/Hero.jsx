import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Parallax } from 'react-parallax';
import { Navigation } from 'swiper/modules';
import "../App.css"
import { useWindowWidth } from '@react-hook/window-size';
const Hero = () => {
    const Width=useWindowWidth()
    return (
        <Parallax bgImage="/feedback.webp" className="rounded-md " strength={500}>
            <div className='xl:h-[70vh] h-[50vh]'>
                    <Swiper
                        modules={[Navigation]}
                        pagination={true}
                        navigation={Width>425?true:false}
                        className="mySwiper h-full w-full flex justify-center items-center text-center "
                    >
                        <SwiperSlide>
                            <div className=' xl:p-28 md:p-12 p-2 w-full h-full lg:flex-row flex-col flex gap-8 justify-center items-center backdrop-blur'>
                                <div className='flex-1 flex justify-center  border-0'>
                                    <img src="https://cezannehr.com/wp-content/uploads/2022/05/Pulse-survey.png" className='lg:w-full md:w-[55%] w-[70%] rounded-lg' alt="" />
                                </div>
                                <div className='flex-1'>
                                    <p className='xl:text-4xl lg:text-3xl md:text-2xl text-lg font-extrabold mb-4 text-purple-900 '>All-In-One Survey Solution</p>
                                    <p className='xl:text-lg lg:text-md text-sm text-justify font-semibold'>SurveySphere provides an all-in-one solution for your survey needs. Create customized surveys effortlessly, engage participants with user-friendly interfaces, gather insightful feedback through various question types, and efficiently manage and analyze results—all within a single platform. Simplify your survey process from creation to analysis with SurveySphere.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=' xl:p-28 md:p-12 p-2 w-full h-full lg:flex-row flex-col flex gap-8 justify-center items-center backdrop-blur'>
                                
                                <div className='flex-1'>
                                    <p className='xl:text-4xl lg:text-3xl md:text-2xl text-lg font-extrabold mb-4 text-purple-900  '>Interactive and Engaging Surveys</p>
                                    <p className='xl:text-lg lg:text-md text-sm text-justify font-semibold'>Elevate your survey experience with SurveySphere's interactive and engaging features. Our platform offers a diverse range of question types, including polls, ratings, and open-ended questions, ensuring dynamic and insightful responses. Participants can 'like' and comment on survey questions, fostering collaboration and providing qualitative insights. Enhance participant engagement and collect richer data with SurveySphere.</p>
                                </div>
                                <div className='flex-1 flex justify-center  border-0'>
                                    <img src="https://www.mycustomer.com/sites/default/files/styles/inline_banner/public/istock_blossomstar_survey.jpg?itok=O99NnX3-" className='lg:w-full md:w-[55%] w-[70%] rounded-lg' alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=' xl:p-28 md:p-12 p-2 w-full h-full lg:flex-row flex-col flex gap-8 justify-center items-center backdrop-blur'>
                            <div className='flex-1 flex justify-center  border-0'>
                                    <img src="https://www.salesforce.com/content/dam/blogs/ca/Blog%20Posts/2022/how-to-write-a-customer-satisfaction-survey-with-examples-header.png" className='lg:w-auto lg:h-auto md:w-[55%] w-[70%] rounded-lg' alt="" />
                                </div>
                                <div className='flex-1'>
                                    <p className='xl:text-4xl lg:text-3xl md:text-2xl text-lg font-extrabold mb-4 text-purple-900 '>Effortless Survey Management</p>
                                    <p className='xl:text-lg lg:text-md text-sm text-justify font-semibold'>Streamline your survey management with SurveySphere's intuitive tools. Organize and categorize surveys effortlessly, track participant responses in real-time, and gain actionable insights through our robust analytics and reporting features. making it easy to track, analyze, and act upon valuable survey data.</p>
                                </div>
                                
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
        </Parallax>
    );
};

export default Hero;