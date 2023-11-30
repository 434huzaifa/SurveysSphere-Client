import { useQuery } from "@tanstack/react-query";
import QueryUtil from "./QueryUtil"
import useAxios from "./useAxios"
import { useState } from "react";
import SurveyCard from "./SurveyCard";
import { Button, Checkbox, Label, TextInput, Tooltip } from "flowbite-react";
import { TbSortAscendingNumbers, TbSortDescendingNumbers } from "react-icons/tb";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading } from "react-icons/ai";
const SurveyPage = () => {
    const caxios = useAxios()
    const [asc, setAsc] = useState(false)
    const [search,setSearch]=useState(`/getallsurvey?asc=${asc}`)
    // let search=`/getallsurvey?asc=${asc}`
    const survey = useQuery({
        queryKey: ['survey', { search }],
        queryFn: async () => {
            let res = await caxios.get(search)
            return res.data
        },
        
    })

    function LetsSearch(e) {
        e.preventDefault();
        let formdata = new FormData(e.target)
        let data = Object.fromEntries(formdata)
        data.category = formdata.getAll('category')
        if (data.category.length != 0) {
            let c_search = `keyword=${data.keyword}&asc=${asc}&category=${encodeURIComponent(data.category.join(','))}`
            // search=`/getallsurvey?${c_search}`
            setSearch(`/getallsurvey?${c_search}`)
            survey.refetch()
            
        } else {
            toast.error("Choose Minimum one Category",{
                theme: "colored"
            })
        }

    }
    function clearall() {
        // search=`/getallsurvey?asc=${asc}`;
        setAsc(false)  
        let e=document.getElementById("search")
        e.reset()
        setSearch(`/getallsurvey?asc=${asc}`)
        survey.refetch()
        
        
             
    }
    function Sorting() {
        let t_search=String(search).replace(`asc=${asc}`,`asc=${!asc}`)
        setAsc(!asc)
        setSearch(t_search)
        survey.refetch()

        
    }
    return (
        <div>
            <div className="my-4">
                <form onSubmit={LetsSearch} id="search">
                    <div className="flex w-full gap-3">
                        <div className="flex-1">
                            <div className="flex gap-2">
                                <TextInput id="keyword" minLength={2} name='keyword' placeholder="Keyword..." type="text" className="flex-1" />
                                <Tooltip content={`Sort by Vote ${asc ? "Ascending" : "Descending"} | Click to Sort current data`} >
                                    <Button outline color="light" onClick={Sorting}>
                                        {
                                            asc ? <TbSortAscendingNumbers className="text-xl" /> : <TbSortDescendingNumbers className="text-xl  " />
                                        }
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox name="category" id="acceptMarketResearch" value="Market Research" defaultChecked />
                                    <Label htmlFor="acceptMarketResearch" className="flex">
                                        Market Research
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox name="category" id="acceptEmployeeEngagement" value="Employee Engagement" defaultChecked />
                                    <Label htmlFor="acceptEmployeeEngagement" className="flex">
                                        Employee Engagement
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox name="category" id="acceptEducationandAcademia" value="Education and Academia" defaultChecked />
                                    <Label htmlFor="acceptEducationandAcademia" className="flex">
                                        Education and Academia
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox name="category" id="acceptSocialandCommunityIssues" value="Social and Community Issues" defaultChecked />
                                    <Label htmlFor="acceptSocialandCommunityIssues" className="flex">
                                        Social and Community Issues
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox name="category" id="acceptHealthandWellness" value=" Health and Wellness" defaultChecked />
                                    <Label htmlFor="acceptHealthandWellness" className="flex">
                                        Health and Wellness
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox name="category" id="acceptTechnologyandInnovation" value="Technology and Innovation" defaultChecked />
                                    <Label htmlFor="acceptTechnologyandInnovation" className="flex">
                                        Technology and Innovation
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox name="category" id="acceptEventFeedback" value="Event Feedback" defaultChecked />
                                    <Label htmlFor="acceptEventFeedback" className="flex">
                                        Event Feedback
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Tooltip content="Empty Keyword will bring all the survey of the selected category">
                                <Button type="submit" className="h-full" isProcessing={survey.isFetching} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} >Search</Button>
                            </Tooltip>
                            <Button onClick={clearall} isProcessing={survey.isFetching} processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />} >Clear</Button>
                        </div>

                    </div>
                </form>
            </div>
            <QueryUtil query={survey}>
                <div className="grid grid-cols-4 gap-2">
                    {
                        survey.data?.map((x, index) => {
                            return (
                                <SurveyCard key={index} x={x}></SurveyCard>
                            )
                        })
                    }
                </div>
            </QueryUtil>
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
        </div>
    );
};

export default SurveyPage;