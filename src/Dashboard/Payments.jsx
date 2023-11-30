import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { Spinner } from "flowbite-react";
import Error from "../Error";
import 'ka-table/style.css';
import { DataType, Table } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
const Payments = () => {
    const caxios = useAxios();
    const paymentdata = useQuery({
        queryKey: ['paymentdata'],
        queryFn: async () => {
            let res = await caxios.get("/allpaymentinfo")
            return res.data
        }
    })
    const columns=[
        {
            key:"name",
            title:"Name",
            dataType: DataType.String,
            sortDirection: SortDirection.Descend,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key:"email",
            title:"Email",
            dataType: DataType.String,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key:"paymentid",
            title:"Payment Id",
            dataType: DataType.String,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,  
        }
    ]
    return (
        <div>
            {
                paymentdata.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner> : paymentdata.isSuccess ? <div>
                    <Table
                                columns={columns}
                                sortingMode={SortingMode.Single}
                                filteringMode={FilteringMode.HeaderFilter}
                                rowKeyField={"_id"}

                                data={paymentdata.data}
                                childComponents={{
                                    headFilterButton: {
                                        content: ({ column: { key } }) => key === 'name' && <></>,
                                    },
                                    headCellContent: {
                                        elementAttributes: () => ({
                                            className: "flex items-center"
                                        })
                                    },
                                    


                                }}
                            ></Table>
                </div> : <Error>Failed to load data</Error>
            }
        </div>
    );
};

export default Payments;