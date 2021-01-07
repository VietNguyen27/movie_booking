import React, { Fragment, useState, useEffect } from 'react';
import './styles/Movie.css';
import Title from 'components/PageTitle/Title';
import AddMovie from './AddMovie';
import useModal from 'components/Modal/useModal';
import { convertList, convertDate } from 'utils/Convert';
import axios from 'axios';

const Movie = () => {
  const initialDefaultValue = {
    title: '',
    genres: [],
    duration: '',
    release_date: '',
    storyline: '',
    actors: [],
    poster_url: '',
    poster_horizontal: '',
    trailer_url: '',
  };
  const [movieData, setMovieData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [movieChosen, setMovieChosen] = useState(initialDefaultValue);
  const [editable, setEditable] = useState(false);
  const excludeColumns = [
    'id',
    'release_date',
    'storyline',
    'poster_url',
    'poster_horizontal',
    'trailer_url',
  ];
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/movies')
        .then((res) => {
          const movieData = res.data;
          setMovieData(movieData);
          setSearchResult(movieData);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const addMovie = (movie) => {
    const {
      title,
      genres,
      duration,
      release_date,
      storyline,
      actors,
      poster_url,
      poster_horizontal,
      trailer_url,
    } = movie;

    axios
      .post('http://localhost:5000/movies', {
        id: movieData.length + 1,
        title,
        genres: changeStringtoArray(genres),
        duration,
        release_date,
        storyline,
        actors: changeStringtoArray(actors),
        poster_url,
        poster_horizontal,
        trailer_url,
      })
      .then((res) => {
        setMovieData([...movieData, res.data]);
        setSearchResult([...movieData, res.data]);
      })
      .catch((error) => console.log(error));
  };

  const showEdit = (id) => {
    setEditable(true);
    axios
      .get(`http://localhost:5000/movies/${id}`)
      .then((res) => {
        const movieData = res.data;
        setMovieChosen(movieData);
      })
      .catch((error) => console.log(error));
  };

  const deleteMovie = (id) => {
    const newMovie = movieData.filter((movie) => movie.id !== id);
    axios
      .delete(`http://localhost:5000/movies/${id}`)
      .then((res) => {
        setMovieData(newMovie);
        setSearchResult(newMovie);
      })
      .catch((error) => console.log(error));
  };

  const editMovie = (e) => {
    e.preventDefault();
    const {
      id,
      title,
      genres,
      duration,
      release_date,
      storyline,
      actors,
      poster_url,
      poster_horizontal,
      trailer_url,
    } = movieChosen;

    const newMovies = searchResult.map((movie) => {
      if (movie.id === movieChosen.id) {
        movie = movieChosen;
      }
      return movie;
    });

    console.log(movieChosen);

    axios
      .put(`http://localhost:5000/movies/${id}`, {
        id,
        title,
        genres,
        duration,
        release_date,
        storyline,
        actors,
        poster_url,
        poster_horizontal,
        trailer_url,
      })
      .then((res) => {
        setSearchResult(newMovies);
      })
      .catch((error) => console.log(error));
    setMovieChosen(initialDefaultValue);
    setEditable(false);
  };

  const filterData = (e) => {
    const lowercasedValue = e.target.value.toLowerCase().trim();
    if (lowercasedValue === '') setMovieData(movieData);
    else {
      const filteredData = movieData.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setSearchResult(filteredData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'genres' || name === 'actors') {
      setMovieChosen({ ...movieChosen, [name]: changeStringtoArray(value) });
    } else setMovieChosen({ ...movieChosen, [name]: value });
  };

  const changeStringtoArray = (str) => {
    return str.split(',');
  };

  console.log(movieChosen);

  return (
    <Fragment>
      <div className='px-4 py-3'>
        <Title title='Danh sách Phim' />
        {editable ? (
          <div className='content bg-white w-full mt-6 px-4 py-3'>
            <div className='flex justify-end'>
              <button
                className='btn-dark px-3 py-1'
                onClick={() => {
                  setMovieChosen(initialDefaultValue);
                  setEditable(false);
                }}
              >
                <i className='fas fa-reply'></i>
              </button>
            </div>
            <form
              className='form m-auto px-4 pt-6 sm:px-8'
              onSubmit={(e) => editMovie(e)}
            >
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Tên phim:
                </label>
                <input
                  type='text'
                  name='title'
                  value={movieChosen.title}
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
                  value={movieChosen.genres}
                  placeholder='Nhập thể loại...'
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
                  value={movieChosen.duration}
                  placeholder='Nhập thời lượng...'
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
                  value={movieChosen.actors}
                  placeholder='Nhập thời lượng...'
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
                  value={movieChosen.release_date}
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
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
                  value={movieChosen.poster_url}
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
                  value={movieChosen.poster_horizontal}
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
                  value={movieChosen.trailer_url}
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
                  name='storyline'
                  value={movieChosen.storyline}
                  placeholder='Nhập cốt truyện...'
                  onChange={(e) => handleChange(e)}
                  className='w-full px-2 py-1 rounded-md resize-none sm:w-2/3'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='btn btn-dark rounded px-3 py-1'
                >
                  <i className='fas fa-save'></i>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className='content bg-white w-full mt-6 px-4 py-3'>
            <div className='flex justify-between'>
              <form className='search-form'>
                <input
                  type='text'
                  placeholder='Tìm kiếm...'
                  onChange={(e) => filterData(e)}
                />
                <button className='btn-dark px-3 py-1'>
                  <i className='fas fa-search'></i>
                </button>
              </form>
              <button className='btn-dark px-3 py-1' onClick={() => toggle()}>
                Thêm phim
              </button>
            </div>
            <table className='table mt-6'>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên phim</th>
                  <th>Thể loại</th>
                  <th>Thời lượng</th>
                  <th>Ngày ra mắt</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {searchResult.length === 0 ? (
                  <tr>
                    <td colSpan='8' className='text-center text-lg'>
                      <span className='block text-4xl'>
                        <i className='fas fa-box-open'></i>
                      </span>
                      Không tìm thấy kết quả
                    </td>
                  </tr>
                ) : (
                  searchResult.map((movieItem, index) => {
                    const {
                      id,
                      title,
                      genres,
                      duration,
                      release_date,
                    } = movieItem;
                    return (
                      <tr key={index}>
                        <td>{id}</td>
                        <td>{title}</td>
                        <td>{convertList(genres)}</td>
                        <td>{duration}</td>
                        <td>{convertDate(release_date)}</td>
                        <td>
                          <button
                            className='btn-dark mr-2 my-1 px-2 py-1'
                            onClick={() => showEdit(id)}
                          >
                            <i className='fas fa-edit'></i>
                          </button>
                          <button
                            className='btn-dark my-1 px-2 py-1'
                            onClick={() => deleteMovie(id)}
                          >
                            <i className='fas fa-trash-alt'></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddMovie isShowing={isShowing} toggle={toggle} addMovie={addMovie} />
    </Fragment>
  );
};

export default Movie;
