import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../useAxios";
import Error from "../Error";
import { Button, Spinner, ToggleSwitch, Tooltip } from "flowbite-react";
import 'ka-table/style.css';
import { DataType, Table } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const ROW_MOUSE_ENTER = 'ROW_MOUSE_ENTER'; // mouse event
const ROW_MOUSE_LEAVE = 'ROW_MOUSE_LEAVE';
const SurveyManager = ({admin}) => {

    const caxios = useAxios()
    const qc = useQueryClient()
    const allsurvey = useQuery({
        queryKey: ['allsurvey'],
        queryFn: async () => {
            let res = await caxios.get("/allsurvey")
            return res.data
        }
    })
    let columns = [
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
        },
        {
            key: "totalvote",
            title: "Votes",
            dataType: DataType.Number,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "isPublish",
            title: "Status",
            dataType: DataType.Boolean,
        },
        {
            key: "reason",
            title: "Reason",
            dataType: DataType.String,
            style: { color: "red" },
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "createdAt",
            title: "Create Date",
            dataType: DataType.Date,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        


    ]
    if (!admin) {
        columns.splice(3,1)
        columns.push({
            key: "status",
            title: "Status",
            dataType: DataType.Boolean,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        })
        columns.push({
            key: "update",
            title: "Update",
            dataType: DataType.String,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        })
    }
    const changepublish = useMutation({
        mutationKey: ["changepublish"],
        mutationFn: async (data) => {
            let res = await caxios.post("/changepublish", data);
            return res.data
        },
        onSuccess: async (data) => {
            qc.invalidateQueries(['allsurvey'])
            if (data?.msg) {
                toast.warn(data?.msg, {
                    theme: "colored"
                })
            } else {
                if (data.isPublish) {
                    toast.success(`${data.title} is "Published"`, {
                        theme: "colored"
                    })
                } else {
                    toast.warn(`${data.title} is "Unpublished"`, {
                        theme: "colored"
                    })
                }


            }

        }
    })
    async function OnChangePublish(value, id) {
        let data = new Object();
        data.id = id;
        data.isPublish = value;
        if (!value) {
            Swal.fire({
                title: `Why do you want to ${value ? "Publish" : "Unpublish"}?`,
                icon: "info",
                input: "text",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "You need to write something!";
                    }
                }
            }).then(async (swaldata) => {
                if (swaldata.isConfirmed) {
                    data.reason = swaldata.value;
                    await changepublish.mutateAsync(data)
                }
            })
        } else {
            await changepublish.mutateAsync(data)
        }
    }
    const navigate = useNavigate()
    function SeeAllResponses(data) {
        if (admin) {
            navigate(`/dashboard/surveyresponse/${data._id}`)
            
        }else{
            navigate(`/surveyresponse/${data._id}`)
        }
    }
    function gotoUpdate(data) {
        navigate(`/updatesurvey/${data._id}`)
    }
    return (
        <div>
            {
                allsurvey.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner> :
                    allsurvey.isSuccess ?
                        <div >
                            <Table
                                columns={columns}
                                sortingMode={SortingMode.Single}
                                filteringMode={FilteringMode.HeaderFilter}
                                rowKeyField={"_id"}
                                loading={{
                                    enabled: changepublish.isPending,
                                    text: "Loading..."
                                }}
                                data={allsurvey.data}
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
                                        elementAttributes: ({ column, rowData }) => {
                                            if (column.key != "isPublish" && column.key != "update") {
                                                return ({
                                                    onClick: () => {
                                                        SeeAllResponses(rowData)
                                                    }
                                                })
                                            }

                                        },
                                        content: ({ column, rowData }) => {
                                            if (column.key == "isPublish") {
                                                return (
                                                    <>
                                                        <Tooltip content={`${rowData.isPublish ? "Published" : "Unpublished"}`}>
                                                            <ToggleSwitch checked={rowData.isPublish} onChange={(value) => OnChangePublish(value, rowData._id)} />
                                                        </Tooltip>
                                                    </>
                                                )
                                            }
                                            if (column.key == "update") {
                                                return (
                                                    <>
                                                        <Button onClick={()=>gotoUpdate(rowData)}>Update</Button>
                                                    </>
                                                )
                                            }
                                            if (column.key == "status" ) {
                                                return (
                                                    <>
                                                        {`${rowData.isPublish ? "Published" : "Unpublished"}`}
                                                    </>
                                                )
                                            }
                                            if (column.key=='createdAt') {
                                                return (
                                                    <>
                                                        {moment(rowData.createdAt).format("DD MMM, YYYY")}
                                                    </>
                                                )
                                            }

                                        }
                                    },
                                    dataRow: {
                                        elementAttributes: (props) => ({
                                            className: "hover:bg-yellow-200/50 cursor-pointer",
                                            title: `Click to See the responses of ${props.rowData.title} `,
                                            onMouseEnter: (event, extendedEvent) => {
                                                const {
                                                    childProps: {
                                                        rowKeyValue,
                                                    },
                                                    dispatch,
                                                } = extendedEvent;
                                                dispatch({ type: ROW_MOUSE_ENTER, rowKeyValue });
                                            },
                                            onMouseLeave: (event, { dispatch }) => {
                                                dispatch({ type: ROW_MOUSE_LEAVE });
                                            },
                                        }),
                                    },


                                }}
                            ></Table>
                        </div> :
                        <Error>Failed to load data</Error>
            }
        </div>
    );
};

export default SurveyManager;