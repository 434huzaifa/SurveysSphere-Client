import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Tooltip } from 'flowbite-react';
import { useState } from 'react';
import Error from './Error';
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
const Stripe = () => {
    const { user,setRole } = useAuth()
    const caxios = useAxios()
    const navigate = useNavigate()
    const payintent = useQuery({
        queryKey: ['intetn', user],
        queryFn: async () => {
            let res = await caxios.get("/payintent")
            return res.data
        },
        staleTime: 0,
        enabled: !!user
    })
    const stripe = useStripe()
    const elements = useElements()
    const [err, setErr] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr("")
        if (payintent.data==null ||payintent.data.clientSecret ) {
            setErr("Secret Missing")
        }
        
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setErr(error?.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            const { paymentIntent, error: payError } = await stripe.confirmCardPayment(
                payintent.data?.clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user?.displayName,
                            email: user?.email
                        },
                    },
                },
            );
            console.log(paymentIntent);
            if (payError) {
                setErr(payError?.message)
            } else {
                if (paymentIntent.status == "succeeded") {
                    caxios.get("/pro").then((res)=>{
                        setRole("Pro")
                        Swal.fire(`${res.data.msg}.`).then(()=>{
                            navigate('/')
                        })
                    })
                    
                }
            }
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className='w-full'>
                <CardElement
                    className='border p-3 rounded-lg border-purple-500'
                    options={{
                        style: {
                            base: {
                                border: "auto",
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: 'rgba(103, 67, 107, 1)',
                                },


                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex justify-center mt-2'>
                    <Tooltip content={`${user?"We want you to be a pro":"Please Login"} `}>
                        <Button type="submit" isProcessing={payintent.isLoading} 
                        processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} 
                        className='text-lg font-bold' disabled={!stripe || !user}>
                            Pay, Only $10
                        </Button>
                    </Tooltip>
                </div>
            <Error>{err}</Error>
        </form>
    );
};

export default Stripe;