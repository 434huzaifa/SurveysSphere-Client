import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const Navbar2 = () => {
    const { user, LogOut, role } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    function loggingout() {
        LogOut().then(() => {
            navigate('/login')
        })
    }

    return (
        <div className='lg:mx-10 mx-1 mb-3'>
            <Navbar fluid rounded>
                <Navbar.Brand href="/">
                    <img src="/survey.webp" className="mr-3 h-6 sm:h-9" alt=" Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SurveySphere</span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Navbar.Toggle />
                    {
                        user && <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <div className='relative   flex justify-center items-center'>
                                    <p className='text-pink-600 border-2 lg:block hidden  font-black p-2 rounded-3xl -bottom-[2px] transition-all -right-0  absolute pr-12'>{role}</p>
                                    <Avatar alt={user?.displayName} className='relative z-20' img={user?.photoURL} size="md" rounded>
                                    </Avatar>
                                </div>
                            }
                        >
                            <Dropdown.Header>
                                <p className='text-pink-600 block lg:hidden  '>{role}</p>
                                <span className="block text-sm">{user?.displayName}</span>
                                <span className="block truncate text-sm font-medium">{user?.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item><Button onClick={loggingout}>LogOut</Button></Dropdown.Item>
                        </Dropdown>
                    }


                </div>


                <Navbar.Collapse >
                    <div className='flex gap-9 items-center'>

                        <NavLink to="/" className="sm:text-sm text-xs lg:text-md">Home</NavLink>
                        {
                            user != null || <NavLink to="/login" className="sm:text-sm text-xs lg:text-md">Login</NavLink>
                        }
                        {
                            role == "Surveyor" && <>
                                <NavLink to="/addsurvey" className="sm:text-sm text-xs lg:text-md">Add Survey</NavLink>
                                <NavLink to="/survey" className="sm:text-sm text-xs lg:text-md">Survey Responses</NavLink></>
                        }
                        <NavLink to="/allsurvey" className="sm:text-sm text-xs lg:text-md">Survey Page</NavLink>

                        {
                            location.pathname == "/" && role=="User" && <NavLink to="/pro" className="bg-green-300 p-2 rounded-md sm:text-sm text-xs lg:text-md">Become Pro</NavLink>

                        }
                        {
                            user==null  && <NavLink to="/pro" className="bg-green-300 p-2 rounded-md sm:text-sm text-xs lg:text-md">Become Pro</NavLink>
                        }
                        {
                            role == "Admin" && <NavLink to="/dashboard" className="sm:text-sm text-xs lg:text-md">Dashboard</NavLink>
                        }

                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navbar2;