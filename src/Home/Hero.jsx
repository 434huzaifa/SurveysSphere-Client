import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Parallax } from 'react-parallax';
import { Navigation } from 'swiper/modules';
import "../App.css"
const Hero = () => {
    return (

        <Parallax bgImage="/feedback.jpg" className="rounded-md " strength={500}>
            <div style={{ height: "70vh" }}>
                    <Swiper
                        modules={[Navigation]}
                        navigation={true}
                        className="mySwiper h-full w-full flex justify-center items-center text-center "
                    >
                        <SwiperSlide>
                            <div className=' p-28 w-full h-full flex gap-8 justify-center items-center backdrop-blur'>
                                <div className='flex-1 border rounded-lg'>
                                    <img src="https://cezannehr.com/wp-content/uploads/2022/05/Pulse-survey.png" className='rounded-lg' alt="" />
                                </div>
                                <div className='flex-1'>
                                    <p className='text-4xl font-extrabold mb-4 text-purple-900 '>All-In-One Survey Solution</p>
                                    <p className='text-lg text-justify font-semibold'>SurveySphere provides an all-in-one solution for your survey needs. Create customized surveys effortlessly, engage participants with user-friendly interfaces, gather insightful feedback through various question types, and efficiently manage and analyze results—all within a single platform. Simplify your survey process from creation to analysis with SurveySphere.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=' p-28 w-full h-full flex gap-8 justify-center items-center backdrop-blur'>
                                
                                <div className='flex-1'>
                                    <p className='text-4xl font-extrabold mb-4 text-purple-900 '>Interactive and Engaging Surveys</p>
                                    <p className='text-lg text-justify font-semibold'>Elevate your survey experience with SurveySphere's interactive and engaging features. Our platform offers a diverse range of question types, including polls, ratings, and open-ended questions, ensuring dynamic and insightful responses. Participants can 'like' and comment on survey questions, fostering collaboration and providing qualitative insights. Enhance participant engagement and collect richer data with SurveySphere.</p>
                                </div>
                                <div className='flex-1 border rounded-lg'>
                                    <img src="https://www.mycustomer.com/sites/default/files/styles/inline_banner/public/istock_blossomstar_survey.jpg?itok=O99NnX3-" className='rounded-lg' alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className=' p-28 w-full h-full flex gap-8 justify-center items-center backdrop-blur'>
                            <div className='flex-1 border rounded-lg'>
                                    <img src="https://www.salesforce.com/content/dam/blogs/ca/Blog%20Posts/2022/how-to-write-a-customer-satisfaction-survey-with-examples-header.png" className='rounded-lg' alt="" />
                                </div>
                                <div className='flex-1'>
                                    <p className='text-4xl font-extrabold mb-4 text-purple-900 '>Effortless Survey Management</p>
                                    <p className='text-lg text-justify font-semibold'>Streamline your survey management with SurveySphere's intuitive tools. Organize and categorize surveys effortlessly, track participant responses in real-time, and gain actionable insights through our robust analytics and reporting features. Whether you're a small team or a large enterprise, SurveySphere adapts to your survey management needs, making it easy to track, analyze, and act upon valuable survey data.</p>
                                </div>
                                
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
        </Parallax>
    );
};

export default Hero;