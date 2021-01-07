import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from 'components/Modal/useOnClickOutside';
import { convertDate } from 'utils/Convert';
import axios from 'axios';

const AddShowing = ({ isShowing, toggle }) => {
  const initialDefaultValue = {
    date: '2021-01-01',
    movieId: 0,
    price: 0,
    cinemaId: 0,
    times: [],
  };
  const modalRef = useRef();
  const [cinema, setCinema] = useState([]);
  const [movie, setMovie] = useState([]);
  const [movieSelected, setMovieSelected] = useState([]);
  const [showing, setShowing] = useState(initialDefaultValue);
  const [showingSelected, setShowingSelected] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/cinemas')
        .then((res) => {
          const cinemaData = res.data;
          setCinema(cinemaData);
        })
        .catch((error) => console.log(error));

      axios
        .get('http://localhost:5000/movies')
        .then((res) => {
          const movieData = res.data;
          setMovie(movieData);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  useOnClickOutside(modalRef, () => {
    setShowing(initialDefaultValue);
    setMovieSelected([]);
    toggle();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const { cinemaId, movieId, date } = showing;

    if (name === 'movieId' || name === 'cinemaId' || name === 'price') {
      setShowing({ ...showing, [name]: Number(value) });
    } else setShowing({ ...showing, [name]: value });

    if (name === 'movieId') {
      const movieSelect = movie.filter(
        (movieItem) => movieItem.id === Number(value)
      );
      setMovieSelected(movieSelect);
    }

    axios
      .get(
        `http://localhost:5000/cinemas/${cinemaId}/showings/?movieId=${movieId}&date=${date}`
      )
      .then((res) => {
        const showingData = res.data;
        setShowingSelected(showingData);
      })
      .catch((error) => console.log(error));
  };

  const checkShowtimes = (cinemaId, movieId, date) => {
    axios
      .get(
        `http://localhost:5000/cinemas/${cinemaId}/showings/?movieId=${movieId}&date=${date}`
      )
      .then((res) => {
        const showingData = res.data;
        setShowingSelected(showingData);
      })
      .catch((error) => console.log(error));
  };

  console.log(showingSelected);

  return isShowing
    ? ReactDOM.createPortal(
        <div className='modal modal-add'>
          <div className='modal-content' ref={modalRef}>
            <div className='modal-inner'>
              <span className='btn btn-close'>
                <i className='fas fa-times' onClick={() => toggle()}></i>
              </span>
              <h1 className='text-2xl text-center tracking-wide uppercase font-medium'>
                Thêm lịch chiếu
              </h1>
              <form className='form m-auto px-4 pt-6 sm:px-8'>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Rạp:
                  </label>
                  <select
                    className='w-full px-2 py-2 rounded-md sm:w-2/3'
                    name='cinemaId'
                    defaultValue={showing.cinemaId}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value='0' disabled hidden>
                      Chọn rạp
                    </option>
                    {cinema.map((cinemaItem, index) => {
                      const { id, cinema_name } = cinemaItem;
                      return (
                        <option value={id} key={index}>
                          {cinema_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Phim:
                  </label>
                  <select
                    className='w-full px-2 py-2 rounded-md sm:w-2/3'
                    name='movieId'
                    defaultValue={showing.movieId}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value='0' disabled hidden>
                      Chọn phim
                    </option>
                    {movie.map((movieItem, index) => {
                      const { id, title } = movieItem;
                      return (
                        <option value={id} key={index}>
                          {title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Ngày ra mắt
                  </label>
                  <input
                    value={
                      movieSelected.length === 0
                        ? 'Vui lòng chọn phim'
                        : convertDate(movieSelected[0].release_date)
                    }
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                    readOnly
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Lịch chiếu:
                  </label>
                  <input
                    type='date'
                    name='date'
                    value={showing.date}
                    placeholder='Nhập mật khẩu xác thực...'
                    autoComplete='off'
                    onChange={(e) => handleChange(e)}
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Giá vé:
                  </label>
                  <input
                    type='text'
                    name='price'
                    placeholder='Nhập giá vé...'
                    autoComplete='off'
                    onChange={(e) => handleChange(e)}
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Thời gian chiếu:
                  </label>
                  <div className='flex w-full rounded-md sm:w-2/3'>
                    <div className='w-1/3'>Thời gian bắt đầu</div>
                    <div className='w-2/3 text-right'>
                      <h1>Suất chiếu:</h1>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AddShowing;
