import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from 'components/Modal/useOnClickOutside';

const AddMovie = ({ isShowing, toggle, addMovie }) => {
  const initialDefaultValue = {
    title: '',
    genres: '',
    duration: '',
    release_date: '2021-01-01',
    storyline: '',
    actors: '',
    poster_url: '',
    poster_horizontal: '',
    trailer_url: '',
  };
  const modalRef = useRef();
  const [movie, setMovie] = useState(initialDefaultValue);
  const [error, setError] = useState('');

  useOnClickOutside(modalRef, () => {
    setError('');
    toggle();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkProperties(movie))
      return setError('Vui lòng nhập đầy đủ thông tin');
    if (movie.password !== movie.confirm_password)
      return setError('Mật khẩu xác nhận không đúng');
    addMovie(movie);
    setMovie(initialDefaultValue);
    toggle();
  };

  const checkProperties = (obj) => {
    for (var key in obj) {
      if (obj[key] === null || obj[key] === '') return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div className='modal modal-add'>
          <div className='modal-content' ref={modalRef}>
            <div className='modal-inner'>
              <span className='btn btn-close'>
                <i className='fas fa-times' onClick={() => toggle()}></i>
              </span>
              <h1 className='text-2xl text-center tracking-wide uppercase font-medium'>
                Thêm phim mới
              </h1>
              <form
                className='form m-auto px-4 pt-6 sm:px-8'
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Tên phim:
                  </label>
                  <input
                    type='text'
                    name='title'
                    value={movie.title}
                    placeholder='Nhập tên phim...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Thể loại:
                  </label>
                  <input
                    type='text'
                    name='genres'
                    value={movie.genres}
                    placeholder='Thể loại...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Thời lượng:
                  </label>
                  <input
                    type='text'
                    name='duration'
                    value={movie.duration}
                    placeholder='Nhập thời lượng phim...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Diễn viên:
                  </label>
                  <input
                    type='text'
                    name='actors'
                    value={movie.actors}
                    placeholder='Diễn viên...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Ngày ra mắt:
                  </label>
                  <input
                    type='date'
                    name='release_date'
                    value={movie.release_date}
                    onChange={(e) => handleChange(e)}
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Poster đứng URL:
                  </label>
                  <input
                    type='text'
                    name='poster_url'
                    value={movie.poster_url}
                    placeholder='Nhập poster URL...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Poster ngang URL:
                  </label>
                  <input
                    type='text'
                    name='poster_horizontal'
                    value={movie.poster_horizontal}
                    placeholder='Nhập poster URL...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Trailer URL:
                  </label>
                  <input
                    type='text'
                    name='trailer_url'
                    value={movie.trailer_url}
                    placeholder='Nhập trailer URL...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md sm:w-2/3'
                  />
                </div>
                <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                  <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                    Nội dung:
                  </label>
                  <textarea
                    type='text'
                    name='storyline'
                    value={movie.storyline}
                    placeholder='Nhập cốt truyện...'
                    onChange={(e) => handleChange(e)}
                    autoComplete='off'
                    className='w-full px-3 py-2 rounded-md resize-none sm:w-2/3'
                  />
                </div>
                <div className='flex justify-between'>
                  <p className='text-red text-lg'>{error}</p>
                  <button
                    type='submit'
                    className='btn btn-dark rounded px-3 py-1'
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default AddMovie;
