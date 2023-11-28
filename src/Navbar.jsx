import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
const Navbar2 = () => {
    const {user,LogOut} = useAuth()
    const navigate=useNavigate()
    function loggingout() {
        LogOut().then(()=>{
            navigate('/login')
        })
    }
    return (
        <div className='mx-10'>
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <img src="/survey.png" className="mr-3 h-6 sm:h-9" alt=" Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SurveySphere</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img={user?.photoURL} rounded />
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
            <Navbar.Collapse>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/addsurvey">Add Survey</NavLink>
                <NavLink to="/allsurvey">Survey Page</NavLink>
                
            </Navbar.Collapse>
        </Navbar>
        </div>
    );
};

export default Navbar2;