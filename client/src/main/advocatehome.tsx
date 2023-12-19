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
import ChatWidget from "../components/ChatWidget"
import Navbar from '@/advonav';
import Footer from '@/footer';
import lawyer_img from './assets/lawyer.svg'
import { useEffect, useRef, useState } from 'react';
import freedom from './human-rights/freedom.jpg'
import advo from './adov-home.jpeg'

interface CardData {
    imageUrl: string;
    title: string;
    description: string;
}


const Advocate_home: React.FC = () => {
    const counterRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
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

    useEffect(() => {
        const options = {
            root: null, // Use the viewport as the root
            threshold: 0.5, // Trigger when 50% of the element is visible
        };

        const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        // Cleanup the observer on component unmount
        return () => observer.disconnect();
    }, []); // Run the effect only once on component mount

    const startCounterAnimation = (target: HTMLDivElement, count: number) => {
        let currentCount = 0;
        const increment = count / 100; // Adjust the increment based on the desired smoothness

        const intervalId = setInterval(() => {
            currentCount += increment;
            target.textContent = Math.floor(currentCount).toString();

            if (currentCount >= count) {
                target.textContent = count.toString(); // Ensure the final count is accurate
                clearInterval(intervalId);
            }
        }, 15); // Adjust the interval for smoother animation
    };

    useEffect(() => {
        if (isIntersecting && counterRef.current) {
            const counterElements = counterRef.current.querySelectorAll('.number-count');
            counterElements.forEach((element) => {
                const count = parseInt(element.getAttribute('data-count') || '0', 10);
                startCounterAnimation(element as HTMLDivElement, count);
            });
        }
    }, [isIntersecting]);


    return (
        <div>
            <Navbar />
            <ChatWidget />


            <header style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1528747008803-f9f5cc8f1a64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Replace with the actual path to your image
                backgroundSize: 'cover', // Adjust as needed
                // backgroundPosition: 'center', // Adjust as needed
                height: "100vh",
            }} className="header py-28  text-center md:pt-36 lg:text-left xl:pt-44 xl:pb-32">
                <div className="container mt-28 flex flex-col justify-center px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-10">
                    <div className="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
                        <h1 className="h1-large mb-4 text-white">NyayMitra</h1>
                        <p className="p-large mb-8 text-slate-200">Are you tired of navigating the complex world of legal jargon and documentation? Look no further!</p>
                        <a className="bg-[#eb427e] pl-8 pr-8 pt-3 pb-3 rounded-xl hover:bg-transparent hover:border border-white hover:text-black hover:no-underline" href="#your-link">Get Started</a>
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
                            <p className="mb-4">Immerse yourself in the NyayMitra Community, a digital sanctuary for legal enthusiasts and inquisitive minds alike. Engage in thought-provoking discussions, seek advice, and explore an abundance of legal resources within a supportive network</p>
                            <p className="mb-4">Whether you're a seasoned professional or an eager learner, NyayMitra Community is your destination for continuous legal education, networking opportunities, and staying informed about the ever-evolving legal landscape.</p>
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
                                    <div>Empower yourself with NyayMitra's Know-your-Right (KYR) Framework, a dynamic chatbot designed for practical understanding of basic laws in various scenarios. Immerse yourself in an interactive exploration that unveils legal landscapes with actionable guidance.</div>
                                </li>
                                <li className="flex">
                                    <div> Whether it's understanding your rights in everyday situations or navigating through legal challenges, the KYR Framework ensures you're equipped with the knowledge to make informed decisions confidently. NyayMitra transforms legal understanding into a practical and engaging adventure with the KYR Framework.</div>
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
                            <h2 className="mb-6">Narrative Legalism</h2>
                            <p className="mb-4">Embark on a captivating journey through Narrative Legalism, an innovative chatbot that transforms the learning of laws into playful and enjoyable narratives. </p>
                            <p className="mb-4">Dive into engaging stories that unravel legal complexities in a fun and accessible manner. NyayMitra's Narrative Legalism goes beyond traditional legal education, making the exploration of laws a delightful adventure through interactive storytelling</p>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="ml-14">
                            <img className="inline" src={lawJargon} alt="alternative" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-24">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
                    <div className="lg:col-span-7">
                        <div className="mb-12 lg:mb-0 xl:mr-14">
                            <img className="inline" src={lawyer_img} alt="alternative" />
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="xl:mt-12">
                            <h2 className="mb-6">Connect to Advocate</h2>
                            <ol className="list mb-7 space-y-2">
                                <li className="flex">
                                    <div>Experience personalized legal support like never before with AdvoConnect, NyayMitra's groundbreaking lawyer matchmaking feature. </div>
                                </li>
                                <li className="flex">
                                    <div> Imagine a streamlined process that connects you with the ideal legal expert based on your unique needs, location, and specialization requirements. Bid farewell to the arduous task of finding the right lawyer; AdvoConnect simplifies the journey, ensuring you discover the perfect legal representation effortlessly and effectively..</div>
                                </li>
                            </ol>
                            <a className="bg-[#eb427e] pl-8 pr-8 pt-3 pb-3 rounded-xl hover:bg-transparent hover:border border-white hover:text-black hover:no-underline">Details</a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="counter" ref={counterRef}>
                <div className="container px-4 sm:px-8">

                    <div id="counter">
                        <div className="cell">
                            <div className="counter-value number-count" data-count="231">1</div>
                            <p className="counter-info">Multilingual</p>
                        </div>
                        <div className="cell">
                            <div className="counter-value number-count" data-count="385">1</div>
                            <p className="counter-info">Issues Solved</p>
                        </div>
                        <div className="cell">
                            <div className="counter-value number-count" data-count="159">1</div>
                            <p className="counter-info">Advocate Family</p>
                        </div>
                        <div className="cell">
                            <div className="counter-value number-count" data-count="127">1</div>
                            <p className="counter-info">Drafts</p>
                        </div>
                    </div>


                </div>
            </div>





            <div id="pricing" className="cards-2">
                <div className="absolute bottom-0 h-40 w-full bg-white"></div>
                <div className="container px-4 pb-px sm:px-8">
                    <h2 className="mb-2.5 text-white lg:max-w-xl lg:mx-auto">Pricing options for all budgets</h2>
                    <p className="mb-16 text-white lg:max-w-3xl lg:mx-auto"> Our pricing plans are setup in such a way that any user can start enjoying Pavo without worrying so much about costs. They are flexible and work for any type of industry </p>


                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Public</div>
                            <div className="price"><span className="currency">₹</span><span className="value">FREE</span></div>
                            <div className="frequency">monthly</div>
                            <p>This basic package covers the needs</p>
                            <ul className="list mb-7 space-y-2 text-left">
                                <li className="flex">
                                    <div>1. Narrative Legalism</div>
                                </li>
                                <li className="flex">
                                    <div>2. Document Summarization</div>
                                </li>
                                <li className="flex">
                                    <div>3. Community support and videos</div>
                                </li>
                            </ul>
                            <div className="button-wrapper">
                                <a className="bg-[#eb427e] pl-8 pr-8 pt-3 pb-3 rounded-xl hover:bg-transparent hover:border border-white hover:text-black hover:no-underline" href="#download">Download</a>
                            </div>
                        </div>
                    </div>




                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Premium</div>
                            <div className="price"><span className="currency">₹</span><span className="value">500</span></div>
                            <div className="frequency">monthly</div>
                            <p>This is a comprehensive package</p>
                            <ul className="list mb-7 text-left space-y-2">
                                <li className="flex">
                                    <div>1. Law Chatbot</div>
                                </li>
                                <li className="flex">
                                    <div>2. Document Draft</div>
                                </li>
                                <li className="flex">
                                    <div>3. Clients</div>
                                </li>
                                <li className="flex">
                                    <div>4. Community</div>
                                </li>
                            </ul>
                            <div className="button-wrapper">
                                <a className="bg-[#eb427e] pl-8 pr-8 pt-3 pb-3 rounded-xl hover:bg-transparent hover:border border-white hover:text-black hover:no-underline" href="#download">Download</a>
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




            {/* <div className="footer">
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
            </div> */}



            {/* <div className="copyright">
                <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-3">
                    <ul className="mb-4 list-unstyled p-small">
                        <li className="mb-2"><a href="article.html">Article Details</a></li>
                        <li className="mb-2"><a href="terms.html">Terms & Conditions</a></li>
                        <li className="mb-2"><a href="privacy.html">Privacy Policy</a></li>
                    </ul>
                    <p className="pb-2 p-small statement">Copyright © <a href="#your-link" className="no-underline">Your name</a></p>

                    <p className="pb-2 p-small statement">Distributed by :<a href="https://themewagon.com/" className="no-underline">Themewagon</a></p>
                </div>

            </div> */}
            <Footer />
        </div>
    )
}

export default Advocate_home