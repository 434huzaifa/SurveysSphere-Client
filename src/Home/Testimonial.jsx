import { Parallax } from 'react-parallax';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import TestiCard from './TestiCard';
const Testimonial = () => {
    const clientReviews = [
        {
            category: "Market Research",
            name: "Emily Thompson",
            email: "emily@example.com",
            review: "The survey platform provided excellent tools for our market research. Easy to create and insightful analytics. Highly recommended!",
            image: "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
        },
        {
            category: "Event Feedback",
            name: "Alex Rodriguez",
            email: "alex@example.com",
            review: "Our event feedback surveys were a breeze to set up. Participants found it user-friendly, and we got valuable insights for future events.",
            image: "https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg"
        },
        {
            category: "Employee Engagement",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            review: "Enhancing employee engagement has never been this seamless. The platform allowed us to create dynamic surveys resulting in improved workplace satisfaction.",
        },
        {
            category: "Education and Academia",
            name: "Michael Chen",
            email: "michael@example.com",
            review: "As an educator, I found the survey website incredibly useful. It's user-friendly and perfect for gathering student feedback and improving academic programs.",
            image: "https://e1.pxfuel.com/desktop-wallpaper/577/168/desktop-wallpaper-gentleman-jacket-person-clothing-smile-man-suit-professional-male-formal-wear-businessperson-trevor-noah-the-daily-show-white-collar-worker-business-executive-2048x1334-men-business.jpg"
        },
        {
            category: "Social and Community Issues",
            name: "Jessica Williams",
            email: "jessica@example.com",
            review: "We used the platform to gather opinions on community issues. It's a powerful tool for amplifying voices and fostering positive change.",
            image: 'https://media.istockphoto.com/id/1153206642/photo/confident-ginger-businessman-smiling-for-camera.jpg?s=612x612&w=0&k=20&c=xxN9v6-zB50n0_LW1Mi7ZiP5ilKH0Zh9sjI8G5S260c=    '
        },
        {
            category: "Health and Wellness",
            name: "David Miller",
            email: "david@example.com",
            review: "Creating health and wellness surveys was a breeze. The platform's flexibility allowed us to tailor surveys for various health initiatives.",
            image: "https://cdn.goodgallery.com/043e0458-cb6d-4b11-a520-3415aed446f8/r/0300/222dbt98/professional-headshot-young-professional-men.jpg"
        },
        {
            category: "Technology and Innovation",
            name: "Olivia Chang",
            email: "olivia@example.com",
            review: "For tech-related surveys, this platform is top-notch. It's efficient, and the real-time updates make it an invaluable tool for innovative projects.",
            imageimage: "https://e1.pxfuel.com/desktop-wallpaper/577/168/desktop-wallpaper-gentleman-jacket-person-clothing-smile-man-suit-professional-male-formal-wear-businessperson-trevor-noah-the-daily-show-white-collar-worker-business-executive-2048x1334-men-business.jpg"
        },
    ];
    return (
        <div className='my-5'>
            <Parallax bgImage="/background.jpg" className="rounded-md" strength={500}>
                <div style={{ height: 500 }}>
                    <Swiper
                        modules={[Navigation]}
                        navigation={true}
                        className="mySwiper h-full w-full flex justify-center items-center text-center "
                    >
                        {
                            clientReviews.map((x, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className=' p-8 w-full h-full'>
                                        <TestiCard x={x}></TestiCard>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </Parallax>

        </div>
    );
};

export default Testimonial;