import React from 'react';
import Carousel from './components/Carousel';
import Post from './components/Post';
import Event from './components/Event';

const Home = () => {
  return (
    <div className='home'>
      <Carousel />
      <Post />
      <Event />
    </div>
  );
};

export default Home;
