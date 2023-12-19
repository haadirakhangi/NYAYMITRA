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
                        <a href='/'>CodePen</a>
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
                    <div id='start'>Start Coding</div>
                </aside>
                <div id='content'>
                    <div id='post'>
                        <div id='placeholder'>
                            <input
                                type='text'
                                placeholder="What's on your mind ?"
                                value={inputValue}
                                onChange={handleInputChange}
                                style={{ width: "280px", margin: '4px' }}
                            />
                            <button onClick={handleAddPost} className=' pl-5 pr-5 pt-2 pb-2 border  bg-black text-white'>Add Post</button>
                        </div>
                    </div>
                    <div>
                        {/* Display posts below the input */}
                        {posts.map((post, index) => (
                            <div key={index} className='post'>
                                {post}
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
