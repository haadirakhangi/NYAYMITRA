import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the hamburger icon and close icon from react-icons
import logo from './img/logo-wbag.png';
import axios from 'axios';

type Props = {};

const Navbar = (props: Props) => {

    const handleLogout = async () => {
        try {
            // Make an Axios request to your logout route
            const response = await axios.get('/api/user/logout');

            // Assuming your server responds with a success message
            if (response.data.success) {
                console.log('Logout successful');
                // You can also redirect the user or perform other actions after logout
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const [isNavOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        setNavOpen(!isNavOpen);
    };

    return (
        <div>
            <nav className="navbar fixed-top" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) , rgba(0, 0, 0, 0) ' }}>
                <div className="container sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap">
                    <a className="font-semibold text-3xl leading-4 no-underline page-scroll" href="index.html">
                        <img src={logo} alt="logo" className="w-44" />
                    </a>

                    {/* Hamburger Icon */}
                    <div className="lg:hidden">
                        <FaBars className="text-white text-3xl  cursor-pointer" onClick={toggleNav} />
                    </div>

                    {/* Navigation Links */}
                    <div className={`fixed top-0 left-0 w-full bg-emerald-500 h-full bg- text-[1.5rem] flex flex-col items-center justify-center ${isNavOpen ? 'flex' : 'hidden'}`}>
                        <FaTimes className="text-white text-5xl absolute top-4 right-4 cursor-pointer" onClick={toggleNav} />
                        <ul className="pl-0 mb-2 flex flex-col space-y-20 items-center justify-center">
                            <li >
                                <a className="nav-link page-scroll active" href="#header">
                                    <NavLink to="/userhome">Home </NavLink>
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#features">
                                    <NavLink to="/features">Features</NavLink>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#details">
                                    <NavLink to="/advoconnect">AdvoConnect</NavLink>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#details">
                                    <NavLink to="/news">News</NavLink>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#details">
                                    <NavLink to="/landing">LogOut</NavLink>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Additional styles for the navigation links on small screens */}
                    <div className={`sm:hidden navbar-collapseoffcanvas-collapse lg:flex lg:flex-grow lg:items-center text-[1rem] ${isNavOpen ? 'hidden' : 'block'}`} id="navbarsExampleDefault">
                        <ul className="pl-0 mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row">
                            <li >
                                <a className="nav-link page-scroll active" href="#header">
                                    <NavLink to="/userhome">Home </NavLink>
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#features">
                                    <NavLink to="/features">Features</NavLink>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#details">
                                    <NavLink to="/advoconnect">AdvoConnect</NavLink>
                                </a>

                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#details">
                                    <NavLink to="/news">News</NavLink>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#details">
                                    <NavLink to="/landing">LogOut</NavLink>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
