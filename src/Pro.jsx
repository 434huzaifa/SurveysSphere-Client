import { Card } from "flowbite-react";
import Stripe from "./Stripe";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAuth from "./useAuth";
const stripePromise = loadStripe(import.meta.env.VITE_PK);
const Pro = () => {
    const {role}=useAuth()
    
    return (
        // Elements eta Stripe er. eta diye always parent ke wrap korte hobe oi route er element ke. otherwise error.
        <Elements stripe={stripePromise}>
            <Card className="my-4">
                
                <div className="flex gap-5">
                    <div className="flex-1 gap-4 flex justify-center items-center flex-col">
                    {
                    role=="Pro"?<>
                    <p className="text-blue-600 text-center text-2xl font-black">Congratulations!! You are a Pro.</p>
                    <p className="text-center text-purple-700 text-lg font-semibold">We Are really glad that you join our pro family. Enjoy the exclusive comment feature.</p>
                    </>
                    :
                    <>
                        <p className="text-blue-600 text-center text-2xl font-black">Unlock the Power of Pro: Elevate Your Survey Experience! </p>
                        <p className="text-center text-purple-700 text-lg font-semibold">Are you ready to take your survey creation journey to the next level? Upgrade to our Pro User subscription and open the door to a world of advanced features designed to supercharge your survey projects.</p>
                        <Card className="bg-red-200 ">
                            <p className="text-xl font-black">Commenting Capabilities for Precision Feedback</p>
                            <p>With our Pro User package, gain exclusive access to the invaluable comment feature! Seamlessly collaborate with your team and gather detailed feedback from respondents. Unleash the power of constructive comments to refine your questions, uncover insights, and perfect your surveys with precision.</p>
                            <div className="flex gap-2">
                                <p className="font-bold w-28 text-center ">its just take <br /> <span className="text-4xl text-purple-400 font-bold">$10</span> <br />  to be a pro</p>
                                <Stripe ></Stripe>
                            </div>
                        </Card>
                    </>
                }


                    </div>
                    <div className="flex-1 rounded-lg">
                        <img src="/pro.jpg" className="rounded-lg" />
                    </div>
                </div>
            </Card>
        </Elements>

    );
};

export default Pro;