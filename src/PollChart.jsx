import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { Chart } from "react-google-charts";
import moment from "moment";
import { Card, Spinner } from "flowbite-react";
import Error from "./Error";
const PollChart = ({ id, title, createdAt }) => {
    const caxios = useAxios()
    const poll = useQuery({
        queryKey: ['chart', id],
        queryFn: async () => {
            let res = await caxios.get(`/surveychart?id=${id}`)
            return res.data
        }
    })
    const options = {
        chart: {
            title: title,
            subtitle: `Voting result from ${createdAt} to ${moment().format("MMMM Do YYYY")}`,
        },
    };
    return (
        <div>
            {
                poll.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner>
                 :
                <Card>
                    {
                        poll.data?.length<=1?<Error>NO ONE VOTED</Error>
                        :
                        <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={poll.data}
                        options={options}
                        
                    />
                    }
                    
                </Card>
            }
            
                
            
        </div>
    );
};

export default PollChart;