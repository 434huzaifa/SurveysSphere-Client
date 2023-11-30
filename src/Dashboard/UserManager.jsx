import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useAxios from "../useAxios"
import { Select, Spinner } from "flowbite-react";
import Error from "../Error";
import 'ka-table/style.css';
import { DataType, Table } from 'ka-table';
import { FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import {toast } from "react-toastify";
import useAuth from "../useAuth";
const UserManeger = () => {
    const {setRole,user}=useAuth()
    const caxios = useAxios()
    const qc=useQueryClient()
    const alluser = useQuery({
        queryKey: ["alluser"],
        queryFn: async () => {
            let res = await caxios.get("/alluser")
            return res.data
        }
    })
    const columns = [
        {
            key: "name",
            title: "Name",
            dataType: DataType.String,
            sortDirection: SortDirection.Descend
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
            key: "role",
            title: "Role",
            dataType: DataType.String,
        },
    ]
    const m_changerole = useMutation({
        mutationKey: ['role changer'],
        mutationFn: async (data) => {
            let res = await caxios.post("/changerole", data)
            return res.data
        },
        onSuccess:async (data) => {
            qc.invalidateQueries(['alluser'])
            if (data?.msg) {
                toast.warn(data?.msg,{
                    theme: "colored"
                })
            }else{
                 toast.success(`${data.name} is ${data.role}`,{
                    theme: "colored"
                })
                if (data.email==user.email) {
                    setRole(data.role)
                }
            }

        }
    })
    async function RoleChanger(e, id) {
        let data = new Object()
        data.role = e.target.value
        data.id = id
        await m_changerole.mutateAsync(data)
    }
    return (
        <div>
            
            {
                alluser.isLoading ? <Spinner className="w-full" color="pink" aria-label="Extra large spinner example Center-aligned" size="xl" ></Spinner>
                    :
                    alluser.isSuccess ?
                        <Table
                            columns={columns}
                            sortingMode={SortingMode.Single}
                            filteringMode={FilteringMode.HeaderFilter}
                            rowKeyField={"_id"}
                            loading={{
                                enabled: m_changerole.isPending,
                                text:"Loading..."
                            }}
                            data={alluser.data}
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
                                    content: ({ column, rowData }) => {
                                        if (column.key == "role") {
                                            return (
                                                <>
                                                    <Select defaultValue={rowData.role} name="role" onChange={(e) => RoleChanger(e, rowData._id)}>
                                                        <option value="Pro" className={`${rowData.role == "Pro" && "bg-green-400 font-bold text-lg"}`}>Pro</option>
                                                        <option value="Admin" className={`${rowData.role == "Admin" && "bg-green-400 font-bold text-lg"}`}>Admin</option>
                                                        <option value="Surveyor" className={`${rowData.role == "Surveyor" && "bg-green-400 font-bold text-lg"}`}>Surveyor</option>
                                                        <option value="User" className={`${rowData.role == "User" && "bg-green-400 font-bold text-lg"}`}>User</option>
                                                    </Select>
                                                </>
                                            );
                                        }

                                    }
                                }

                            }}
                        ></Table>
                        : <Error>Failed to Load Data</Error>
            }
            
        </div>
    );
};

export default UserManeger;