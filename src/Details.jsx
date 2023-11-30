import { Link, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, Button, Card, FooterDivider, Label, Radio, Spinner, TextInput, Tooltip } from "flowbite-react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";
import PollChart from "./PollChart";
import Error from "./Error";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

const Details = () => {
    const [rating, setRating] = useState(0)
    const { user,role } = useAuth()
    const caxios = useAxios()
    const { id } = useParams()
    
    const commentdata = useQuery({
        queryKey: ['comment', id],
        queryFn: async () => {
            let res = await caxios(`/getcomment?id=${id}`)
            return res.data
        },
        enabled: !!id && !!user,
        
    })
    const insertcomment = useMutation({
        mutationFn: async (data) => {
            let res = await caxios.post('/setcomment', data)
            return res.data
        },
        onSuccess: async () => {
            commentdata.refetch()
        }
    })
    const s_data = useQuery({
        queryKey: ['details', id, user],
        queryFn: async () => {
            let res = await caxios(`/getsurvey?id=${id}`)
            setRating(parseInt(res.data.isLike))
            return res.data
        },
        enabled: !!id,
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
        const changelike = useMutation({
            mutationFn: async (data) => {
                let res = await caxios.post(`/changelike`, data)
                return res.data
            },
            enabled: !!id && !!user,
            onSuccess: async () => {
            await s_data.refetch()
        }
    })
    const vote = useMutation({
        mutationFn: async (data) => {
            let res = await caxios.post('/vote', data)
            return res.data
        },
        onSuccess: async () => {
            s_data.refetch()
        }
    })
    function SetSurveyDetails(e) {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(e.target))
        data.survey = id
        data.qsize = s_data.data.questions.length

        if (s_data.data?.options == null) {
            vote.mutateAsync(data)
        }
        
    }
    async function ChangeLike(value) {
        
        setRating(value)
        if (value != rating && rating == 0) {
            changelike.mutateAsync({ value: value, survey: id })
        }
        
    }
    async function GetCommentData(e) {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(e.target))
        data.survey = id
        insertcomment.mutateAsync(data)
        e.target.reset()
    }
    const reportsurvey=useMutation({
        mutationFn:async (data)=>{
            let res=await caxios.post("/reportsurvey",data)
            return res.data
        },
        onSuccess:()=>{
            Swal.fire({
                title:"Report Successfully",
                icon:"success"
            })
        }
    })
     function ReportIt() {
        Swal.fire({
            title:"Do you want to report this for inappropriate survey?",
            icon:"question",
            showCancelButton:true,
            showConfirmButton:true,
        }).then(async swaldata=>{
            if (swaldata.isConfirmed) {
                reportsurvey.mutateAsync({id})
            }
        })
    }
    return (
        <div>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {
                s_data.data?.options != null ? <PollChart id={id} title={s_data.data?.title} createdAt={moment(s_data.data?.createdAt).format("MMMM Do YYYY")}></PollChart> :
                (moment(s_data.data?.expire).isBefore(moment(), 'year') ||
                moment(s_data.data?.expire).isBefore(moment(), 'month') ||
                moment(s_data.data?.expire).isBefore(moment(), 'date')) && <PollChart id={id} title={s_data.data?.title} createdAt={moment(s_data.data?.createdAt).format("MMMM Do YYYY")}></PollChart>
            }


            <Card className="my-4 ">
                {
                    s_data.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner>
                        :
                        <>
                            <div className="flex justify-between items-center  ">
                                <div className="flex items-center gap-2">
                                    <p className="text-4xl  font-bold text-blue-500">{s_data.data?.title}</p>
                                    <p className="italic text-sm text-pink-600"> ▶ {s_data.data?.category}</p>
                                </div>
                                <p className="italic font-bold "> <span className="text-lime-500">{moment(s_data.data?.createdAt).format("MMMM Do YYYY")}</span>  - <span className="text-pink-600">{moment(s_data.data?.expire).format("MMMM Do YYYY")}</span> </p>
                            </div>
                            <p className="text-xl text-gray-800 -mb-4">{s_data.data?.description}</p>
                            <FooterDivider className="border-1 "></FooterDivider>
                            <form className="-mt-4 flex justify-center items-center  gap-2 flex-col" onSubmit={SetSurveyDetails}>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 justify-center">
                                    {
                                        s_data.data?.questions?.map((x, index) => {
                                            return (
                                                <fieldset key={index} className="flex mb-4 w-full font-bold flex-col gap-2">
                                                    <legend className="mb-2 break-all">{`${index + 1}. ${x}`}</legend>
                                                    <div className="flex gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <Radio id={`${index}Yes`} name={index} defaultChecked={s_data.data.options != null && s_data.data.options[index]} value={true} required />
                                                            <Label htmlFor={`${index}Yes`}>Yes</Label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Radio id={`${index}No`}
                                                                defaultChecked={s_data.data.options != null && !s_data.data.options[index]}
                                                                name={index} value={false} required />
                                                            <Label htmlFor={`${index}No`}>No</Label>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    s_data.data?.options != null ||
                                        (moment(s_data.data?.expire).isSameOrAfter(moment(), 'year') &&
                                            moment(s_data.data?.expire).isSameOrAfter(moment(), 'month') &&
                                            moment(s_data.data?.expire).isSameOrAfter(moment(), 'date')) ?
                                        <div className="flex justify-center flex-col items-center w-full">
                                            {
                                             s_data.data?.options != null || ['Pro','User'].includes(role) &&  <Button className="w-1/2 mt-4" disabled={!user} type="submit" isProcessing={vote.isPending} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>Submit</Button>
                                            }

                                            
                                            {
                                                !user && <p className="w-full text-center my-4 italic text-red-600 text-lg font-bold">You need to login for Participate,Like,Dislike and Comment.  <Link to='/login' className="text-blue-500 underline">Click here to Login</Link> </p>
                                            }

                                        </div> :
                                        <Error>This Survey Expired</Error>
                                }

                            </form>
                        </>
                }
                {
                    moment(s_data.data?.expire).isSameOrAfter(moment(), 'year') &&
                    moment(s_data.data?.expire).isSameOrAfter(moment(), 'month') &&
                    moment(s_data.data?.expire).isSameOrAfter(moment(), 'date') && user && ['Pro','User'].includes(role) &&
                    <div className="flex justify-between -mb-4">
                        <Rating
                            style={{ maxWidth: 80 }}
                            value={rating}
                            itemStyles={customStyles}
                            items={2}
                            spaceBetween="medium"
                            transition="zoom"
                            onChange={value => ChangeLike(value)}
                            highlightOnlySelected
                            isDisabled={changelike.isPending}
                            readOnly={!rating == 0}
                            className="flex gap-4"
                        />
                        {
                            ['Pro','User'].includes(role) && <Button className="bg-red-600" size="sm" isProcessing={reportsurvey.isPending} onClick={ReportIt}>Report</Button>
                        }
                        
                    </div>
                }

                <FooterDivider className="border-1 "></FooterDivider>
                {
                    user ? role=="Pro" ?
                    <form onSubmit={GetCommentData}>
                        <div className="flex justify-start items-center w-full gap-2">
                            <Avatar alt="User settings" img={user?.photoURL} rounded />
                            <TextInput disabled={!user} className="flex-1" id="title" minLength={4} name='text' type="text" required />
                            <Button type="submit" disabled={!user}>Comment</Button>
                        </div>
                    </form>:
                    <Error>You need to be pro to participate in comment <Link to="/pro" className="text-blue-500 italic underline">Click here to be pro now</Link> </Error>:
                    ""
                }

                {
                    commentdata.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner> :
                        commentdata.data?.map((x, index) => {
                            return (
                                <div key={index} className="flex w-full justify-start items-center gap-2 px-5 mt-5">
                                    <Tooltip content={x.user.name}>
                                        <Avatar alt={x.user.name} img={x.user.image} />
                                    </Tooltip>
                                    <p>{x.text}</p>
                                </div>
                            )
                        })
                }
                {
                     commentdata.data?.length==0 && <Error>No One Commented</Error>
                }



            </Card>

        </div>
    );
};
export default Details;