import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Select, Spinner, Textarea } from "flowbite-react";
import { Label, TextInput } from 'flowbite-react';
import useAxios from "./useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Error from "./Error";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineLoading } from "react-icons/ai";
import Swal from "sweetalert2";
const UpdateSurvey = () => {
    const caxios = useAxios()
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams()
    const qc=useQueryClient()
    const s_data = useQuery({
        queryKey: ['updatedetails', id],
        queryFn: async () => {
            let res = await caxios(`/getsurvey?id=${id}`)
            setStartDate(moment(res.data.expire).toDate())
            return res.data
        },
        enabled: !!id,
        staleTime: 0
    })
    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setStartDate(e);
    };
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const mutation = useMutation({
        mutationFn: async (data) => {
            let res = await caxios.put(`/updatesurvey?id=${s_data.data._id}`, data)
            return res.data
        },
        onSuccess: () => {
            Swal.fire({
                title:"Update Successful",
                icon:"success"
            }).then(()=>{
                qc.invalidateQueries(['updatedetails'])
                navigate(`/survey`)
            })
        },
        enabled:s_data.data!=null
    })
    async function SubmitSurvey(e) {
        e.preventDefault()
        let data = Object.fromEntries(new FormData(e.target))
        let count = 0
        let t_q = {}
        for (let index = 0; index < 10; index++) {
            if (data[`q${index}`] != "") {
                t_q[`q${count}`] = data[`q${index}`]
                count++;
            }
            delete data[`q${index}`];
        }
        data={...data,...t_q}
        data.expire=startDate
        data.qsize=count
        mutation.mutateAsync(data)
    }
    let q=new Array(10).fill("")
    return (
        <div className="my-4">
            <Card>
                {
                    s_data.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner> : s_data.isSuccess ?
                        <>
                            <form onSubmit={SubmitSurvey}>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="title" value="title" />
                                    </div>
                                    <TextInput defaultValue={s_data.data?.title} id="title" minLength={4} name='title' type="text" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="Description" />
                                    </div>
                                    <Textarea defaultValue={s_data.data?.description} id="description" name='description'></Textarea>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="category" value="Category" />
                                    </div>
                                    <Select name="category" required defaultValue={s_data.data?.description.category}>
                                        <option value="Market Research">Market Research</option>
                                        <option value="Event Feedback">Event Feedback</option>
                                        <option value="Employee Engagement">Employee Engagement</option>
                                        <option value="Education and Academia">Education and Academia</option>
                                        <option value="Social and Community Issues">Social and Community Issues</option>
                                        <option value="Health and Wellness">Health and Wellness</option>
                                        <option value="Technology and Innovation">Technology and Innovation</option>
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="expire" value="Expire Date  " />
                                    </div>
                                    <TextInput onClick={handleClick} name="expire" value={moment(startDate,).format( "DD MMMM, YYYY")}></TextInput>
                                    {isOpen && (
                                        
                                        <DatePicker 
                                        
                                        selected={startDate} 
                                        onChange={handleChange} 
                                        minDate={Date.now()}
                                        inline
                                        closeOnScroll={true}
                                         />
                                    )}
                                    

                                </div>
                                <p className="w-full text-center italic text-blue-600">Make the question field empty if you want to delete question</p>
                                {
                                    q.map((x, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="mb-2 block">
                                                    <Label htmlFor={`q${index}`} value={`Question No. ${parseInt(index) + 1}`} />
                                                </div>
                                                <TextInput defaultValue={s_data.data?.questions?.at(index)} id={`q${index}`} minLength={4} name={`q${index}`} type="text" />
                                            </div>
                                        )
                                    })
                                }
                                <Button type="submit" className="mt-4 w-full" isProcessing={mutation.isPending} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} >Update</Button>
                            </form>
                        </> :
                        <Error>Failed to load data</Error>
                }


            </Card>
        </div>
    );
};

export default UpdateSurvey;