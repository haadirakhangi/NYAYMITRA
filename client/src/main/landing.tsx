import React from 'react';
import img from './assets/images/logo.svg' 
import './assets/css/bd-coming-soon.css'
import { NavLink } from 'react-router-dom';
import logo from '../img/logo-wbag.png'

const ComingSoonPage: React.FC = () => {
    return (
        <div className='main'>
            <header style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="">
                        <img src={logo} alt="logo" className="w-56" />
                    </div>
                </div>
                <div className='maintain'>
                    <NavLink to='/advo-login'><button className='nav'>Advocate</button></NavLink>
                    <NavLink to='/admin-login'><button className='nav'>Admin</button></NavLink>
                    <NavLink to='/user-login'><button className='nav'>User</button></NavLink>
                </div>
            </header>


            <main className="my-auto">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 className="page-title">NyayMitra.</h1>
                            {/* <h2>Enlightening Law, Enlightening You</h2> */}
                            {/* <br/> */}
                            <p className="page-subtitle"><strong>Where legal complexities meet simplicity. Your trusted partner in making the law accessible, understandable, and actionable.</strong></p>
                            <form className="subscribe-form">
                                <div className="form-group">
                                    <input type="email" name="email" id="email" className="form-control" placeholder="email address" />
                                </div>
                                <NavLink to='/user-login'><button type="submit" className="btn subscribe-btn">Notify Me</button></NavLink>
                            </form>
                        </div>

                    </div>
                </div>
            </main>

            <footer className="text-center">
                <div className="container">
                    <nav className="footer-social-links">
                        <a href="#!" className="social-link"><i className="mdi mdi-facebook-box"></i></a>
                        <a href="#!" className="social-link"><i className="mdi mdi-twitter"></i></a>
                        <a href="#!" className="social-link"><i className="mdi mdi-google"></i></a>
                    </nav>
                </div>
            </footer>
        </div>
    );
};

export default ComingSoonPage;
