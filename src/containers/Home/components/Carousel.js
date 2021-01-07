import React, { useState, useEffect } from 'react';
import './styles/Carousel.css';
import Tabs from 'components/Tabs/Tabs';
import Slide from './Slide';
import axios from 'axios';

const Carousel = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [x, setX] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/movies')
        .then((res) => {
          const nowShowingMovie = res.data.filter(
            (e) => new Date(e.release_date) - new Date() < 0
          );
          setNowShowing(nowShowingMovie);
          const comingSoonMovie = res.data.filter(
            (e) => new Date(e.release_date) - new Date() > 0
          );
          setComingSoon(comingSoonMovie);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const prevSlide = () => {
    x === 0 ? setX(-100 * (nowShowing.length - 1)) : setX(x + 100);
  };

  const nextSlide = () => {
    x === -100 * (nowShowing.length - 1) ? setX(0) : setX(x - 100);
  };

  const getDate = () => {};

  return (
    <div className='carousel pb-4'>
      <div className='carousel-content -mx-2'>
        <Tabs className='slider flex flex-start overflow-hidden relative'>
          <div label='Phim đang chiếu' onClick={getDate}>
            {nowShowing.map((movieItem, index) => {
              return <Slide key={index} movieItem={movieItem} x={x} />;
            })}
            <div className='btn-control'>
              <button className='btn btn-prev' onClick={() => prevSlide()}>
                <i className='fas fa-chevron-left'></i>
              </button>
              <button className='btn btn-next' onClick={() => nextSlide()}>
                <i className='fas fa-chevron-right'></i>
              </button>
            </div>
          </div>
          <div label='Phim sắp chiếu' onClick={getDate}>
            {comingSoon.map((movieItem, index) => {
              return <Slide key={index} movieItem={movieItem} x={x} />;
            })}
            <div className='btn-control'>
              <button className='btn btn-prev' onClick={() => prevSlide()}>
                <i className='fas fa-chevron-left'></i>
              </button>
              <button className='btn btn-next' onClick={() => nextSlide()}>
                <i className='fas fa-chevron-right'></i>
              </button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Carousel;
