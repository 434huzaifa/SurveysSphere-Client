import { useParams } from "react-router-dom";
import useAxios from "../useAxios";
import { useQuery } from "@tanstack/react-query";
import 'ka-table/style.css';
import { DataType, Table } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import Error from "../Error";
import { Spinner } from "flowbite-react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import PollChart from "../PollChart";
const AllResponses = () => {
    const { id } = useParams()
    const caxios = useAxios()
    const reposnses = useQuery({
        queryKey: ['responses', id],
        queryFn: async () => {
            let res = await caxios.get(`/allresponses?id=${id}`)
            return res.data
        }
    })
    let columns = [
        {
            key: "name",
            title: "Name",
            dataType: DataType.String,
            sortDirection: SortDirection.Descend,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "email",
            title: "Email",
            dataType: DataType.String,
            isHeaderFilterPopupShown: false,
            isFilterable: false,
            isEditable: false,
        },
        {
            key: "like",
            title: "Like",
            dataType: DataType.Boolean,
        },
    ]
    if (!reposnses.isLoading && reposnses.isSuccess) {
        for (let index = 0; index < reposnses.data.qsize; index++) {
            columns.push({
                key: `${index}`,
                title: `Q${index + 1}`,
                dataType: DataType.Boolean,
                isHeaderFilterPopupShown: false,
                isFilterable: false,
                isEditable: false,
                width: "60px",
                style:{
                    padding:0,
                }

            })
        }
    }
    return (
        <div>
            {
                reposnses.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner> : reposnses.isSuccess ?
                    <div>
                        <PollChart 
                        id={reposnses.data?.survey?._id}
                        title={reposnses.data?.survey?.title}
                        createdAt={reposnses.data?.survey?.createdAt}
                         ></PollChart>
                        <Table
                            noData={{
                                text: "No One Voted"
                            }}
                            columns={columns}
                            sortingMode={SortingMode.Single}
                            filteringMode={FilteringMode.HeaderFilter}
                            rowKeyField={"_id"}

                            data={reposnses.data.reposnses}
                            childComponents={{
                                headFilterButton: {
                                    content: ({ column: { key } }) => key === 'name' && <></>,
                                },
                                headCellContent: {
                                    elementAttributes: () => ({
                                        className: "flex items-center"
                                    })
                                },
                                cell: {
                                    elementAttributes: ({ column }) => {
                                        let index = parseInt(column.key)
                                        if (!isNaN(index)) {
                                            return ({
                                                style: { padding: "0"},
                                            })
                                        }
                                        },
                                    content: ({ column, rowData }) => {
                                        if (column.key == "like") {
                                            if (rowData.like != null) {
                                                if (rowData.like) {
                                                    return <BiLike />
                                                } else {
                                                    return <BiDislike />
                                                }
                                            }

                                        }
                                        let index = parseInt(column.key)
                                        if (!isNaN(index)) {
                                            if (rowData.options[index]) {
                                                return <AiOutlineCheck />
                                            } else {
                                                return <AiOutlineClose />
                                            }

                                        }

                                    }
                                },

                            }}
                        ></Table>
                    </div> :
                    <Error>Failed to load data</Error>
            }
        </div>
    );
};

export default AllResponses;