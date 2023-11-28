import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { Chart } from "react-google-charts";
import QueryUtil from "./QueryUtil";
import moment from "moment";
import { Card } from "flowbite-react";
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
            <QueryUtil query={poll}>

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
            </QueryUtil>
        </div>
    );
};

export default PollChart;