import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "../App.css"
const Hero = () => {
    return (
        <div className='bg-image h-screen'>
            <Swiper navigation={true} modules={[Navigation]} className='h-full'>
                <SwiperSlide>
                    <div className='h-full bg-black/40 flex items-center justify-center flex-col gap-2   '>
                        <p className='font-black text-5xl  text-white text-center'>We Provide Feature Rich Online Survey for you and your businesses</p>
                        <img src="/image1.jpg" className='w-48 rounded-xl' alt="" />
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-full bg-black/40 flex items-center justify-center flex-col gap-2   '>
                        <p className='font-black text-5xl  text-white text-center'>Create Your Survey with few Click</p>
                        <img src="/image1.jpg" className='w-48 rounded-xl' alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-full bg-black/40 flex items-center justify-center flex-col gap-2   '>
                    <p className='font-black text-5xl  text-white text-center'>Become a <span className='text-red-600'>Pro User</span> get exclusive access </p>
                    <img src="/image1.jpg" className='w-48 rounded-xl' alt="" />
                </div></SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Hero;