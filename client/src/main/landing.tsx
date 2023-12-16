import React from 'react';
import img from './assets/images/logo.svg'
import './assets/css/bd-coming-soon.css'
import { NavLink } from 'react-router-dom';

const ComingSoonPage: React.FC = () => {
    return (
        <div className='main'>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="brand-wrapper">
                        <img src={img} alt="logo" className="logo" />
                    </div>
                </div>
                <div className='maintain'>
                    <NavLink to='/advo-login'><button className='nav'>Advocate</button></NavLink>
                    <NavLink to='/user-login'><button className='nav'>User</button></NavLink>
                </div>
            </header>


            <main className="my-auto">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 className="page-title">LegalAi.</h1>
                            <p className="page-subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu sit amet consectetur.</p>
                            <form className="subscribe-form">
                                <div className="form-group">
                                    <input type="email" name="email" id="email" className="form-control" placeholder="email address" />
                                </div>
                                <button type="submit" className="btn subscribe-btn">Notify Me</button>
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
