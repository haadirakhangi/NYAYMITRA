import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './img/logo-wbag.png'

type Props = {};

const Navbar = (props: Props) => {
    return (
        <div>
            <nav className="navbar fixed-top " style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) , rgba(0, 0, 0, 0) ' }}>
                <div className="container sm:px-4 lg:px-8 flex flex-wrap h-[80px] items-center justify-between lg:flex-nowrap">
                    <a className="font-semibold text-3xl leading-4 no-underline page-scroll" href="index.html">
                        <img src={logo} alt='logo' className='w-44'/>
                    </a>

                    <div className="navbar-collapseoffcanvas-collapse lg:flex lg:flex-grow lg:items-center text-[1rem]" id="navbarsExampleDefault">
                        <ul className="pl-0  mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row">
                            <li>
                                <a className="nav-link page-scroll active" href="#header"><NavLink to='/userhome'>Home </NavLink><span className="sr-only">(current)</span></a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#features"><NavLink to='/features'>Features</NavLink></a>
                            </li>
                            <li>
                                <a className="nav-link page-scroll" href="#details"><NavLink to='/advoconnect'>AdvoConnect</NavLink></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Navbar;
