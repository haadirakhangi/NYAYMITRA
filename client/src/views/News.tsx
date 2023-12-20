import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/navbar';
import Footer from '@/footer';

interface NewsItem {
    title: string;
    link: string;
    description: string;
}

const NewsComponent: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    //   useEffect(() => {
    //     const fetchNews = async () => {
    //       try {
    //         const response = await axios.get<NewsItem[]>('/api/get_news');
    //         setNews(response.data);
    //       } catch (error) {
    //         console.error('Error fetching news:', error);
    //       }
    //     };

    //     fetchNews();
    //   }, []); // The empty dependency array ensures the effect runs once after the initial render

    useEffect(() => {
        // Simulating a static data response
        const staticData: NewsItem[] = [
            {
                title: 'Sample News 1',
                link: 'https://google.com',
                description: 'This is the description for Sample News 1.',
            },
            {
                title: 'Sample News 2',
                link: 'https://google.com',
                description: 'This is the description for Sample News 2.',
            },
            // Add more items as needed
            {
                title: 'Sample News 1',
                link: 'https://google.com',
                description: 'This is the description for Sample News 1.',
            },
            {
                title: 'Sample News 2',
                link: 'https://google.com',
                description: 'This is the description for Sample News 2.',
            },
            {
                title: 'Sample News 1',
                link: 'https://google.com',
                description: 'This is the description for Sample News 1.',
            },
            {
                title: 'Sample News 2',
                link: 'https://google.com',
                description: 'This is the description for Sample News 2.',
            },
            {
                title: 'Sample News 1',
                link: 'https://google.com',
                description: 'This is the description for Sample News 1.',
            },
            {
                title: 'Sample News 2',
                link: 'https://google.com',
                description: 'This is the description for Sample News 2.',
            },
            {
                title: 'Sample News 1',
                link: 'https://google.com',
                description: 'This is the description for Sample News 1.',
            },
            {
                title: 'Sample News 2',
                link: 'https://google.com',
                description: 'This is the description for Sample News 2.',
            },
            {
                title: 'Sample News 1',
                link: 'https://google.com',
                description: 'This is the description for Sample News 1.',
            },
            {
                title: 'Sample News 2',
                link: 'https://google.com',
                description: 'This is the description for Sample News 2.',
            },
            {
                title: 'Sample News 1',
                link: 'https://google.com',
                description: 'This is the description for Sample News 1.',
            },
            {
                title: 'Sample News 2',
                link: 'https://google.com',
                description: 'This is the description for Sample News 2.',
            },
            
        ];

        setNews(staticData);
    }, []);

    return (
        <div>
            <Navbar/>
            <h1 className='flex items-center place-content-center m-5'>Latest News</h1>
            <ul className='flex w-screen flex-wrap'>
                {news.map((item, index) => (
                    <li key={index} className='border border-black m-3 p-3'>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className='text-black'>{item.title}</a>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
            <Footer/>
        </div>
    );
};

export default NewsComponent;
