import React from 'react';
import './css/fontawesome-all.css';
import './css/magnific-popup.css';
import './css/styles.css';
import './css/swiper.css';
import lawyer from './features/lawyer.png';
import donation from './features/donation.png';
import forum from './features/forum.png';
import documentImg from './features/document.png';
import rights from './features/rights.png';
// import CardGrid from '../components/Card';
import documentDraft from './assets/images/document draft.png';
import humanRights from './assets/images/human rights.jpg';
import lawJargon from './assets/images/law jargon.jpg';
import { NavLink } from 'react-router-dom';
import ChatWidget from "../components/ChatWidget"

interface CardData {
  imageUrl: string;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const cardsData: CardData[] = [
    {
      imageUrl: documentImg,
      title: 'Document Drafting',
      description: 'Effortlessly generate precise and efficient legal documents, including contracts, agreements, and legal notices, with our advanced document drafting AI.',
    },
    {
      imageUrl: rights,
      title: 'Know Your Rights',
      description: 'Navigate the complexities of the legal landscape with our Know-Your-Rights framework. We simplify intricate laws into user-friendly insights, providing you with a legal compass for informed decision-making.',
    },
    {
      imageUrl: lawyer,
      title: 'Advo Connect',
      description: 'Connect with legal experts in real-time through Advo Connect. Engage in conversations to seek advice and clarification on a wide range of legal matters with our interactive platform.',
    },
    {
      imageUrl: forum,
      title: 'Legal Consultancy Forums',
      description: 'Participate in Legal Consultancy Forums to analyze legal cases, extract relevant information, and generate insightful reports. Collaborate with legal professionals to enhance your understanding of complex legal issues.',
    },
    {
      imageUrl: donation,
      title: 'Platform for Legal Aid Fund-Raising',
      description: 'Contribute to the cause of justice by using our platform for Legal Aid Fund-Raising. Automatically review contracts, identify potential issues, and ensure compliance while supporting legal aid initiatives.',
    },
    {
      imageUrl: documentImg,
      title: 'Legal Compliance Checker',
      description: 'Safeguard against legal risks with our Legal Compliance Checker. Leverage our AI-powered tool to ensure legal compliance by checking documents against the latest laws and regulations, providing you with peace of mind.',
    },
  ];

    return (
        <div>
            <ChatWidget/>
            <nav className="navbar fixed-top ">
                <div className="container sm:px-4 lg:px-8 flex flex-wrap h-[50px] items-center justify-between lg:flex-nowrap">

                    <a className="text-gray-800 font-semibold text-3xl leading-4 no-underline page-scroll" href="index.html">Logo</a>

                    <div className="navbar-collapse offcanvas-collapse lg:flex lg:flex-grow lg:items-center text-[1rem]" id="navbarsExampleDefault">
                        <ul className="pl-0  mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row">
                            <li>
                                <a className="nav-link page-scroll active" href="#header">Home <span className="sr-only">(current)</span></a>
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

            <header id="header" className="header py-28 text-center md:pt-36 lg:text-left xl:pt-44 xl:pb-32">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                    <div className="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
                        <h1 className="h1-large mb-5">Team management mobile application</h1>
                        <p className="p-large mb-8">Start getting things done together with your team based on Pavo's revolutionary team management features</p>
                        <a className="btn-solid-lg" href="#your-link">Download</a>
                        <a className="btn-solid-lg secondary" href="#your-link">Download</a>
                    </div>
                </div>
            </header>
            <div className="pt-4 pb-14 text-center">
                <div className="container px-4 sm:px-8 xl:px-4">
                    <p className="mb-4 mt-12 text-gray-800 text-3xl leading-10 lg:max-w-5xl lg:mx-auto font-serif"> Welcome to "NyayMitra" your friendly guide to understanding the ins and outs of the legal world. Whether you're a law enthusiast, a student with legal dreams, or just curious about how laws affect you, this show is here to make it all clear and interesting.</p>
                </div>
            </div>




            {/* <div classNameName="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto lg:m-5 lg:ml-12">
                {cardsData.map((card, index) => (
                    <CardGrid
                        key={index}
                        imageUrl={card.imageUrl}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div> */}



            <div id="details" className="pt-12 pb-16 lg:pt-16">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
                    <div className="lg:col-span-5">
                        <div className="mb-16 lg:mb-0 xl:mt-16">
                            <h2 className="mb-6">Document Drafting</h2>
                            <p className="mb-4">AI can be utilized to assist in drafting legal documents by generating text based on provided information and templates</p>
                            <p className="mb-4">AI-generated content should be reviewed and edited by a legal professional to ensure accuracy and compliance with the relevant laws and regulations.</p>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="xl:ml-14">
                            <img className="inline" src={documentDraft} alt="alternative" />
                        </div>
                    </div>
                </div>
            </div>




            <div className="py-24">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
                    <div className="lg:col-span-7">
                        <div className="mb-12 lg:mb-0 xl:mr-14">
                            <img className="inline" src={humanRights} alt="alternative" />
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="xl:mt-12">
                            <h2 className="mb-6">Know Your Rights</h2>
                            <ol className="list mb-7 space-y-2">
                                <li className="flex">
                                    <div>1. AI enables individuals to make informed decisions about their rights and legal situations.</div>
                                </li>
                                <li className="flex">
                                    <div>2. Knowing your rights proactively mitigates legal risks and prevents potential issues.</div>
                                </li>
                                <li className="flex">
                                    <div>3. Translates complex legal language, making it accessible to a broader audience.</div>
                                </li>
                            </ol>
                            <a className="btn-solid-reg popup-with-move-anim mr-1.5" href="#details-lightbox">Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-16 pb-12">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
                    <div className="lg:col-span-5">
                        <div className="mb-16 lg:mb-0 xl:mt-16">
                            <h2 className="mb-6">Law Jargon</h2>
                            <p className="mb-4">Facilitates deep analysis of case law, statutes, and regulations with unprecedented accuracy.</p>
                            <p className="mb-4">Scrutinizes legal documents to ensure adherence to ethical standards and professional codes of conduct.</p>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="ml-14">
                            <img className="inline" src={lawJargon} alt="alternative" />
                        </div>
                    </div>
                </div>
            </div>



            <div className="counter">
                <div className="container px-4 sm:px-8">

                    <div id="counter">
                        <div className="cell">
                            <div className="counter-value number-count" data-count="231">1</div>
                            <p className="counter-info">Happy Users</p>
                        </div>
                        <div className="cell">
                            <div className="counter-value number-count" data-count="385">1</div>
                            <p className="counter-info">Issues Solved</p>
                        </div>
                        <div className="cell">
                            <div className="counter-value number-count" data-count="159">1</div>
                            <p className="counter-info">Good Reviews</p>
                        </div>
                        <div className="cell">
                            <div className="counter-value number-count" data-count="127">1</div>
                            <p className="counter-info">Case Studies</p>
                        </div>
                        <div className="cell">
                            <div className="counter-value number-count" data-count="211">1</div>
                            <p className="counter-info">Orders Received</p>
                        </div>
                    </div>


                </div>
            </div>
            {/* <div className="slider-1 py-32 bg-gray">
                <div className="container px-4 sm:px-8">
                    <h2 className="mb-12 text-center lg:max-w-xl lg:mx-auto">What do users think about Pavo</h2>


                    <div className="slider-container">
                        <div className="swiper-container card-slider">
                            <div className="swiper-wrapper">


                                <div className="swiper-slide">
                                    <div className="card">
                                        <img className="card-image" src="./images/testimonial-1.jpg" alt="alternative" />
                                        <div className="card-body">
                                            <p className="italic mb-3">It's been so fun to work with Pavo, I've managed to integrate it properly into my business flow and it's great</p>
                                            <p className="testimonial-author">Jude Thorn - Designer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="card">
                                        <img className="card-image" src="./images/testimonial-2.jpg" alt="alternative" />
                                        <div className="card-body">
                                            <p className="italic mb-3">We were so focused on launching as many campaigns as possible that we've forgotten to target our loyal customers</p>
                                            <p className="testimonial-author">Roy Smith - Developer</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="card">
                                        <img className="card-image" src="./images/testimonial-3.jpg" alt="alternative" />
                                        <div className="card-body">
                                            <p className="italic mb-3">I've been searching for a tool like Pavo for so long. I love the reports it generates and the amazing high accuracy</p>
                                            <p className="testimonial-author">Marsha Singer - Marketer</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="swiper-slide">
                                    <div className="card">
                                        <img className="card-image" src="./images/testimonial-4.jpg" alt="alternative" />
                                        <div className="card-body">
                                            <p className="italic mb-3">We've been waiting for a powerful piece of software that can help businesses manage their marketing projects</p>
                                            <p className="testimonial-author">Tim Shaw - Designer</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="swiper-slide">
                                    <div className="card">
                                        <img className="card-image" src="./images/testimonial-5.jpg" alt="alternative" />
                                        <div className="card-body">
                                            <p className="italic mb-3">Searching for a great prototyping and layout design app was difficult but thankfully I found app suite quickly</p>
                                            <p className="testimonial-author">Lindsay Spice - Marketer</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="swiper-slide">
                                    <div className="card">
                                        <img className="card-image" src="./images/testimonial-6.jpg" alt="alternative" />
                                        <div className="card-body">
                                            <p className="italic mb-3">The app support team is amazing. They've helped me with some issues and I am so grateful to the entire team</p>
                                            <p className="testimonial-author">Ann Blake - Developer</p>
                                        </div>
                                    </div>
                                </div>


                            </div>


                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>


                        </div>
                    </div>


                </div>
            </div> */}



            <div id="pricing" className="cards-2">
                <div className="absolute bottom-0 h-40 w-full bg-white"></div>
                <div className="container px-4 pb-px sm:px-8">
                    <h2 className="mb-2.5 text-white lg:max-w-xl lg:mx-auto">Pricing options for all budgets</h2>
                    <p className="mb-16 text-white lg:max-w-3xl lg:mx-auto"> Our pricing plans are setup in such a way that any user can start enjoying Pavo without worrying so much about costs. They are flexible and work for any type of industry </p>


                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">STANDARD</div>
                            <div className="price"><span className="currency">$</span><span className="value">29</span></div>
                            <div className="frequency">monthly</div>
                            <p>This basic package covers the marketing needs of small startups</p>
                            <ul className="list mb-7 space-y-2 text-left">
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>List building and relations</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Seamless platform integration</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Great performance on devices</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Community support and videos</div>
                                </li>
                            </ul>
                            <div className="button-wrapper">
                                <a className="btn-solid-reg page-scroll" href="#download">Download</a>
                            </div>
                        </div>
                    </div>



                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">ADVANCED</div>
                            <div className="price"><span className="currency">$</span><span className="value">39</span></div>
                            <div className="frequency">monthly</div>
                            <p>This is a more advanced package suited for medium companies</p>
                            <ul className="list mb-7 space-y-2 text-left">
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>List building and relations</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Seamless platform integration</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Great performance on devices</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Community support and videos</div>
                                </li>
                            </ul>
                            <div className="button-wrapper">
                                <a className="btn-solid-reg page-scroll" href="#download">Download</a>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">COMPLETE</div>
                            <div className="price"><span className="currency">$</span><span className="value">49</span></div>
                            <div className="frequency">monthly</div>
                            <p>This is a comprehensive package designed for big organizations</p>
                            <ul className="list mb-7 text-left space-y-2">
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>List building and relations</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Seamless platform integration</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Great performance on devices</div>
                                </li>
                                <li className="flex">
                                    <i className="fas fa-chevron-right"></i>
                                    <div>Community support and videos</div>
                                </li>
                            </ul>
                            <div className="button-wrapper">
                                <a className="btn-solid-reg page-scroll" href="#download">Download</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




            {/* <div id="download" className="basic-5">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-2">
                    <div className="mb-16 lg:mb-0">
                        <img src="./images/conclusion-smartphone.png" alt="alternative" />
                    </div>
                    <div className="lg:mt-24 xl:mt-44 xl:ml-12">
                        <p className="mb-9 text-gray-800 text-3xl leading-10">Team management mobile applications don’t get much better than Pavo. Download it today</p>
                        <a className="btn-solid-lg" href="#your-link"><i className="fab fa-apple"></i>Download</a>
                        <a className="btn-solid-lg secondary" href="#your-link"><i className="fab fa-google-play"></i>Download</a>
                    </div>
                </div>
            </div> */}




            <div className="footer">
                <div className="container px-4 sm:px-8">
                    <h4 className="mb-8 lg:max-w-3xl lg:mx-auto">Pavo is a mobile application for marketing automation and you can reach the team at <a className="text-indigo-600 hover:text-gray-500" href="mailto:email@domain.com">email@domain.com</a></h4>
                    <div className="social-container">
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-facebook-f fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-twitter fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-pinterest-p fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-instagram fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-youtube fa-stack-1x"></i>
                            </a>
                        </span>
                    </div>
                </div>
            </div>



            <div className="copyright">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-3">
                    <ul className="mb-4 list-unstyled p-small">
                        <li className="mb-2"><a href="article.html">Article Details</a></li>
                        <li className="mb-2"><a href="terms.html">Terms & Conditions</a></li>
                        <li className="mb-2"><a href="privacy.html">Privacy Policy</a></li>
                    </ul>
                    <p className="pb-2 p-small statement">Copyright © <a href="#your-link" className="no-underline">Your name</a></p>

                    <p className="pb-2 p-small statement">Distributed by :<a href="https://themewagon.com/" className="no-underline">Themewagon</a></p>
                </div>

            </div>
        </div>
    )
}

export default Home