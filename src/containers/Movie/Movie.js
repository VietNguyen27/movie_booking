import React, { Fragment, useState, useEffect } from 'react';
import Title from 'components/PageTitle/Title';
import MovieItem from './components/MovieItem';
import Tabs from 'components/Tabs/Tabs';
import axios from 'axios';

const Movie = (props) => {
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const { state } = props.location;

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
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const getDate = () => {};

  return state ? (
    <Fragment>
      <Title title={`Kết quả tìm kiếm: ${state.result}`} />

      {state.movieSearch.length === 0 ? (
        <div className='py-8' style={{ minHeight: '36vh' }}>
          <p className='text-lg'>Không tìm thấy phim theo từ khóa.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 items-start gap-4 justify-start md:grid-cols-3 sm:grid-cols-2 py-8'>
          {state.movieSearch.map((movieItem, index) => {
            return <MovieItem key={index} movieItem={movieItem} />;
          })}
        </div>
      )}
    </Fragment>
  ) : (
    <Fragment>
      <Title title='Danh sách phim' />
      <Tabs className='grid grid-cols-1 items-start gap-4 justify-start md:grid-cols-3 sm:grid-cols-2'>
        <div label='Phim đang chiếu' onClick={getDate} className='movie-list'>
          {nowShowing.map((movieItem, index) => {
            return <MovieItem key={index} movieItem={movieItem} />;
          })}
        </div>
        <div label='Phim sắp chiếu' onClick={getDate} className='movie-list'>
          {comingSoon.map((movieItem, index) => {
            return <MovieItem key={index} movieItem={movieItem} />;
          })}
        </div>
      </Tabs>
    </Fragment>
  );
};

export default Movie;
