import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/navbar';
import Footer from '@/footer';
import { Container, Typography, Card, CardContent, Link, Grid } from '@mui/material';

interface NewsItem {
  title: string;
  link: string;
  description: string;
}

const NewsComponent: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>('/api/get_news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container className="bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800 text-white p-8 rounded-md">
      <Typography
        variant="h3"
        align="center"
        mt={5}
        mb={3}
        className="text-6xl transform animate-pulse"
      >
        Latest News
      </Typography>
      <Grid container spacing={3}>
        {news.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card className="bg-white rounded-md h-full overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <CardContent className="flex flex-col h-full">
                <Typography variant="h6" component="div" gutterBottom>
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {item.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" className="text-gray-700 flex-grow">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsComponent;
