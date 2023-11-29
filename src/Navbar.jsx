import { Avatar, Badge, Button, Dropdown, Navbar } from 'flowbite-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
const Navbar2 = () => {
    const { user, LogOut, role } = useAuth()
    console.log("🔥 ~ file: Navbar.jsx ~ line 6 ~ role", role)
    
    const navigate = useNavigate()
    const location=useLocation()
    function loggingout() {
        LogOut().then(() => {
            navigate('/login')
        })
    }
    return (
        <div className='mx-10 mb-3'>
            <Navbar fluid rounded>
                <Navbar.Brand href="/">
                    <img src="/survey.png" className="mr-3 h-6 sm:h-9" alt=" Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SurveySphere</span>
                </Navbar.Brand>
                {
                    user && <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                                <Avatar alt={user?.displayName} className='relative' img={user?.photoURL} size="md" rounded>
                                    <Badge className='rounded-full -left-7  absolute text-sm' color="pink" size="sm">{role}</Badge>
                                </Avatar>
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user?.displayName}</span>
                            <span className="block truncate text-sm font-medium">{user?.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item><Button onClick={loggingout}>LogOut</Button></Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                }
                
                <Navbar.Collapse>
                <div className='flex gap-9 items-center'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/addsurvey">Add Survey</NavLink>
                    <NavLink to="/allsurvey">Survey Page</NavLink>
                    {
                        location.pathname=="/"&&role!="Pro" && <NavLink to="/pro" className="bg-green-300 p-2 rounded-md">Become Pro</NavLink>

                    }
                    
                    <NavLink to="/dashboard">Dashboard</NavLink>

                    
                        
                        </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navbar2;