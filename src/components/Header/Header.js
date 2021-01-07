import React, { Fragment, useState } from 'react';
import './Header.css';
import Logo from 'images/logo.png';
import Navbar from './Navbar';
import useModal from 'components/Modal/useModal';
import ModalAlert from 'components/Modal/ModalAlert/ModalAlert';
import { NavLink } from 'react-router-dom';
import { getUser, removeUserSession } from 'utils/Common';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [click, setClick] = useState(false);
  const user = getUser();
  const history = useHistory();
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [movieSearch, setMovieSearch] = useState([]);
  const { isShowing, toggle } = useModal();

  const onClick = () => {
    setClick(!click);
  };

  const handleLogout = () => {
    removeUserSession();
    history.push('/');
    window.location.reload();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchMovie(value);
  };

  const searchMovie = (value) => {
    if (value.trim().length > 0) {
      axios
        .get(`http://localhost:5000/movies?title_like=${value}`)
        .then((res) => {
          const movieData = res.data;
          setMovieSearch(movieData);
          setResult(value);
          setValue('');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlertMessage('Vui lòng nhập tên phim');
      toggle();
    }
  };

  const onChange = (e) => {
    setResult('');
    setValue(e.target.value);
  };

  return (
    <Fragment>
      <header className='header bg-primary'>
        <div className='container'>
          <div className='relative'>
            <NavLink to='/' className='inline-block'>
              <img src={Logo} alt='' className='logo' />
            </NavLink>
            <div className='header-right inline-block w-full'>
              <div className='header-top flex justify-end items-center pb-0 md:pb-3'>
                <form
                  className='input-group hidden sm:inline-block'
                  onSubmit={(e) => onSubmit(e)}
                >
                  <input
                    type='text'
                    name='search'
                    value={value}
                    placeholder='Tìm kiếm phim...'
                    autoComplete='off'
                    onChange={(e) => onChange(e)}
                  />
                  <button className='text-dark-blue'>
                    <i className='fas fa-search'></i>
                  </button>
                </form>
                {user.isLogging ? (
                  <NavLink
                    to={`/user/${user.id}`}
                    className='btn mx-2 text-sm sm:text-base'
                    style={{ textTransform: 'none' }}
                  >
                    {user.name}
                  </NavLink>
                ) : (
                  <NavLink
                    to='/register'
                    className='btn mx-2 text-sm sm:text-base'
                  >
                    Đăng ký
                  </NavLink>
                )}
                {user.isLogging ? (
                  <button
                    className='btn ml-2 mr-0 text-sm sm:text-base md:mr-2'
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </button>
                ) : (
                  <NavLink
                    to='/login'
                    className='btn ml-2 mr-0 text-sm sm:text-base md:mr-2'
                  >
                    Đăng nhập
                  </NavLink>
                )}
              </div>
              <button
                className='btn btn-more text-2xl float-right block mt-2 md:hidden sm:text-3xl sm:mt-0'
                onClick={() => onClick()}
              >
                <i className={`fas fa-${click ? 'times' : 'bars'}`}></i>
              </button>
              <nav
                className={`navbar w-full ${
                  click ? 'block' : 'hidden'
                } md:block md:w-auto md:m-0`}
              >
                <Navbar searchMovie={searchMovie} onClick={onClick} />
              </nav>
            </div>
          </div>
        </div>
      </header>
      {result.length > 0 && (
        <Redirect
          to={{
            pathname: '/movies',
            search: `?title=${result}`,
            state: { movieSearch, result },
          }}
        />
      )}
      <ModalAlert
        isShowing={isShowing}
        toggle={toggle}
        alertMessage={alertMessage}
      />
    </Fragment>
  );
};

export default Header;
