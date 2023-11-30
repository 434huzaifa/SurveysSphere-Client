import { Badge, Card } from 'flowbite-react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { NavLink, Outlet } from 'react-router-dom';
import { MdOutlinePayment, MdAssessment, MdGroup, MdInfo ,MdReorder } from "react-icons/md";
import { ToastContainer } from 'react-toastify';
import useAxios from '../useAxios';
import { useQuery } from '@tanstack/react-query';
const Dashboard = () => {
    const caxios=useAxios()
    const numberOfReport=useQuery({
        queryKey:['numberofreport'],
        queryFn:async ()=>{
            let res=await caxios.get("/totalreport")
            return res.data
        }
    })
    return (
        <Card className='w-full min-h-[70vh]'>
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
            <div className='flex gap-8 min-h-[70vh]'>
                <Sidebar >
                    <Menu
                    className='p-2'>
                        <MenuItem  icon={<MdReorder className='text-2xl' />} component={<NavLink  to="/dashboard" />} end >  Dashboard Home</MenuItem>
                        <MenuItem  icon={<MdGroup className='text-2xl' />} component={<NavLink  to="/dashboard/user" />}> User Manager</MenuItem>
                        <MenuItem icon={<MdOutlinePayment className='text-2xl' />} component={<NavLink to="/dashboard/payment" />}> Payment Info</MenuItem>
                        <MenuItem icon={<MdAssessment className='text-2xl' />} component={<NavLink to="/dashboard/survey" />}>Survey Manager </MenuItem>
                        <MenuItem icon={<><MdInfo className='text-2xl' /></>} component={<NavLink to="/dashboard/reported" />}> 
                        <div className='flex gap-2 items-center'>
                            <p>Reported</p>
                            <Badge className='p-1 font-bold' color="pink">{numberOfReport.data?.total || 0}</Badge>
                        </div>
                        </MenuItem>
                    </Menu>
                </Sidebar>
                <Outlet></Outlet>
            </div>
        </Card>
    );
};

export default Dashboard;