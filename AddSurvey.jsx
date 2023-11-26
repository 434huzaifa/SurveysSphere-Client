import { useMutation } from "@tanstack/react-query";
import { Card, Select, Textarea } from "flowbite-react";
import { Button, Label, TextInput } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';
import useAxios from "./src/useAxios";
import { useNavigate } from "react-router-dom";
const AddSurvey = () => {
    const caxios=useAxios()
    const navigate=useNavigate()
    const mutation=useMutation({
        mutationFn:async (data)=>{
           let res=await caxios.post('/insertsurvey',data)
           return res.data
        },
        onSuccess:()=>{
            navigate('/')
        }
    })
    async function SubmitSurvey(e) {
        e.preventDefault()  
        let data=Object.fromEntries(new FormData(e.target))
        mutation.mutateAsync(data)
    }
    return (
        <div className="my-4">
            <Card>
                <form onSubmit={SubmitSurvey}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="title" />
                        </div>
                        <TextInput id="title" minLength={4} name='title' type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <Textarea id="description" name='description'></Textarea>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="category" value="Category" />
                        </div>
                        <Select name="category" required>
                            <option value="Market Research">Market Research</option>
                            <option value="Employee Engagement">Employee Engagement</option>
                            <option value="Education and Academia">Education and Academia</option>
                            <option value="Social and Community Issues">Social and Community Issues</option>
                            <option value="Health and Wellness">Health and Wellness</option>
                            <option value="Technology and Innovation">Technology and Innovation</option>
                        </Select>
                    </div>
                    {
                        
                    }
                    <Button type="submit" className="mt-4 w-full" isProcessing={mutation.isPending} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} >Post</Button>
                </form>

            </Card>
        </div>
    );
};

export default AddSurvey;