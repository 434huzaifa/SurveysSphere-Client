import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios"
import { Spinner } from "flowbite-react";
import Error from "../Error"
import { Chart } from "react-google-charts";
const DashboardHome = () => {
    const caxios = useAxios()
    const summarydata = useQuery({
        queryKey: ['summarydata'],
        queryFn: async () => {
            let res = await caxios.get('/summarydata')
            return res.data
        },
        staleTime:0
    })
    return (
        <div className="w-full">
            <div>
                {
                    summarydata.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner> :
                        <>
                            {
                                summarydata.isSuccess ?
                                    <>
                                        <div className="grid grid-cols-2">
                                            <Chart
                                            className="p-0"
                                                chartType="PieChart"
                                                data={summarydata.data.userinfo}
                                                options={{
                                                    title: "Users",
                                                    is3D: true,
                                                }}
                                                width={"100%"}
                                                height={"400px"}
                                            />
                                            <Chart
                                            className="p-0"
                                                chartType="PieChart"
                                                data={summarydata.data.surveyifno}
                                                options={{
                                                    title: "Surveys",
                                                    is3D: true,
                                                }}
                                                width={"100%"}
                                                height={"400px"}
                                            />
                                            <Chart
                                            className="p-0"
                                                chartType="PieChart"
                                                data={summarydata.data.status}
                                                options={{
                                                    title: "Surveys Status",
                                                    is3D: true,
                                                }}
                                                width={"100%"}
                                                height={"400px"}
                                            />
                                        </div>
                                    </>
                                    :
                                    <Error>Failed to load data</Error>
                            }

                        </>
                }
            </div>

        </div>
    );
};

export default DashboardHome;