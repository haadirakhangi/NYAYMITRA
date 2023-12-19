import React, { useState } from 'react';
import './comunity.css';
import Navbar from '@/navbar';
import Footer from '@/footer';

type Props = {};

const Community = (props: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [posts, setPosts] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddPost = () => {
        if (inputValue.trim() !== '') {
            setPosts((prevPosts) => [...prevPosts, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div>
            <Navbar />
            <header className='header'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/9/9a/CodePen_logo.png'
                    width='300'
                    height='75'
                    alt='Logo'
                />
                <div id='info'>
                    <h1 id='name'>
                        <br />
                        <a href='/'>NyayMitra</a>
                        <br />
                    </h1>

                    <nav>
                        <ul>
                            <li>
                                <a href='/'>
                                    <i className='fa fa-home'></i>Home
                                </a>
                            </li>
                            <li>
                                <a href='/trending'>
                                    <i className='fa fa-codepen'></i>Featured
                                </a>
                            </li>
                            <li>
                                <a href='/about'>About</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div id='links'>
                    <div id='link-container'>
                        <a className='fa fa-boomark'></a>
                        <a className='fa fa-microphone'></a>
                        <a className='fa fa-file-code'></a>
                    </div>
                </div>
            </header>
            <main>
                <aside>
                    <h2>Welcome to NyayMitra</h2>
                    <p>
                        Ready to experience the future of legal assistance? Join the LawBot AI community today and embark on a smoother, more informed legal journey. Got questions? Our team is here to help! Contact us at support@nyaymitra.com.
                    </p>
                    <hr />
                    <div id='start'>Community</div>
                </aside>
                <div id='content'>
                    <div>
                        <div id='placeholder' className='space-x-10'>
                            <input
                                type='text'
                                placeholder="What's on your mind ?"
                                value={inputValue}
                                onChange={handleInputChange}
                                style={{ width: "380px", margin: '4px', height: '38px' }}
                            />
                            <button onClick={handleAddPost} className='bg-[#eb427e] text-black pl-8 pr-8 pt-3 pb-3 rounded-xl hover:bg-transparent hover:border border-black hover:no-underline'>Add Post</button>
                        </div>
                    </div>
                    <div className=''>
                        <article className='m-5'>
                            <h2>Where can i get document summary?</h2>
                            <p>Document Summary can be found in features. Feel free to adapt the content to suit your specific document or context. Summarization aims to capture the key points concisely while retaining the essential information from the original text.</p>
                        </article>
                        <article className='m-5'>
                            <h2>Can i connect to advocates in my budget?</h2>
                            <p>AdvoConnect is an feature you connect to advocates at as per your budget</p>
                        </article>
                    </div>
                    <div>
                        {/* Display posts below the input */}
                        {posts.map((post, index) => (
                            <div key={index} className='post'>
                                <article className='m-5'>
                                    <h2>{post}</h2>                                    
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Community;
