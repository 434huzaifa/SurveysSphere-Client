import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { Button, Spinner } from "flowbite-react";
import Error from "../Error";
import 'ka-table/style.css';
import { DataType, Table } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import Swal from "sweetalert2";
const Reported = () => {
    const caxios = useAxios()
    const reportedata = useQuery({
        queryKey: ['reporteddata'],
        queryFn: async () => {
            let res = await caxios.get("/getallreport")
            return res.data
        }
    })
    const columns = [
        {
            key: "title",
            title: "Title",
            dataType: DataType.String,
            sortDirection: SortDirection.Descend,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        
        {
            key: "category",
            title: "Category",
            dataType: DataType.String,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "action",
            title: "Take Action",
            dataType: DataType.String,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
            
        },
    ]
    const qc=useQueryClient()
    const actionTaktion=useMutation({
        mutationFn:async (data)=>{
            let res=await caxios.post("/reportaction",data)
            return res.data
        },
        onSuccess:(data)=>{
            Swal.fire({
                title:`${data.msg}`,
                icon:"success"
            })
            qc.invalidateQueries(['numberofreport'])
            qc.invalidateQueries(['reporteddata'])
        }
    })
    function actionTaker(id) {
        let data=new Object()
        data.id=id
        Swal.fire({
            title: `Do you want to take action? Write your reason`,
            icon: "question",
            input: "text",
            showCancelButton: true,
            showConfirmButton:true,
            denyButtonText:"Delete Report",
            confirmButtonText:"Unpublish Report",
            cancelButtonText:"Close Modal",
            showDenyButton:true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        }).then(async (swaldata) => {
            if (swaldata.isConfirmed) {
                data.reason = swaldata.value;
                await actionTaktion.mutateAsync(data)
            }else if (swaldata.isDenied) {
                await actionTaktion.mutateAsync(data)
            }
        })
    }
    return (
        <div>
            {
                reportedata.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner> : reportedata.isSuccess ?
                    <div>
                        <Table
                            columns={columns}
                            sortingMode={SortingMode.Single}
                            filteringMode={FilteringMode.HeaderFilter}
                            rowKeyField={"_id"}
                            loading={{
                                enabled: actionTaktion.isPending,
                                text: "Loading..."
                            }}
                            data={reportedata.data}
                            childComponents={{
                                headFilterButton: {
                                    content: ({ column: { key } }) => key === 'name' && <></>,
                                },
                                headCellContent: {
                                    elementAttributes: () => ({
                                        className: "flex items-center",

                                    })
                                },
                                cell: {
                                    content: ({ column, rowData }) => {
                                        if (column.key == "action") {
                                            return (
                                                <>
                                                <Button onClick={()=>{actionTaker(rowData._id)}}>Action</Button>
                                                </>
                                            )
                                        }

                                    }
                                },



                            }}
                        ></Table>
                    </div>
                    : <Error>Failed to load data</Error>
            }
        </div>
    );
};

export default Reported;