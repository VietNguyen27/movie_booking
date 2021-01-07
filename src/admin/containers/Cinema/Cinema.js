import React, { Fragment, useState, useEffect } from 'react';
import './styles/Cinema.css';
import Title from 'components/PageTitle/Title';
import useModal from 'components/Modal/useModal';
import AddCinema from './AddCinema';
import axios from 'axios';

const Cinema = () => {
  const initialDefaultValue = {
    cinema_name: '',
    address: '',
    email: '',
    hotline: '',
    image_url: '',
    seats: {},
  };
  const [cinemaData, setCinemaData] = useState([]);
  const [cinemaChosen, setCinemaChosen] = useState(initialDefaultValue);
  const [editable, setEditable] = useState(false);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/cinemas')
        .then((res) => {
          const cinemaData = res.data;
          setCinemaData(cinemaData);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const addCinema = (cinema) => {
    const { cinema_name, email, hotline, address, image_url, seats } = cinema;
    axios
      .post('http://localhost:5000/cinemas', {
        id: cinemaData.length + 1,
        cinema_name,
        address,
        email,
        hotline,
        image_url,
        seats,
      })
      .then((res) => {
        setCinemaData([...cinemaData, res.data]);
      })
      .catch((error) => console.log(error));
  };

  const showEdit = (id) => {
    setEditable(true);
    axios
      .get(`http://localhost:5000/cinemas/${id}`)
      .then((res) => {
        const cinemaData = res.data;
        setCinemaChosen(cinemaData);
      })
      .catch((error) => console.log(error));
  };

  const deleteCinema = (id) => {
    const newCinema = cinemaData.filter((cinema) => cinema.id !== id);
    axios
      .delete(`http://localhost:5000/cinemas/${id}`)
      .then((res) => {
        console.log(res.data);
        setCinemaData(newCinema);
      })
      .catch((error) => console.log(error));
  };

  const editCinema = (e) => {
    e.preventDefault();
    const {
      id,
      cinema_name,
      address,
      email,
      hotline,
      image_url,
      seats,
    } = cinemaChosen;

    const newCinemas = cinemaData.map((cinema) => {
      if (cinema.id === cinemaChosen.id) {
        cinema = cinemaChosen;
      }
      return cinema;
    });

    axios
      .put(`http://localhost:5000/cinemas/${id}`, {
        id,
        cinema_name,
        address,
        email,
        hotline,
        image_url,
        seats,
      })
      .then((res) => {
        setCinemaData(newCinemas);
      })
      .catch((error) => console.log(error));
    setEditable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCinemaChosen({ ...cinemaChosen, [name]: value });
  };

  return (
    <Fragment>
      <div className='px-4 py-3'>
        <Title title='Danh sách Rạp' />
        {editable ? (
          <div className='content bg-white w-full mt-6 px-4 py-3'>
            <div className='flex justify-end'>
              <button
                className='btn-dark px-3 py-1'
                onClick={() => setEditable(false)}
              >
                <i className='fas fa-reply'></i>
              </button>
            </div>
            <form
              className='form m-auto px-4 pt-6 sm:px-8'
              onSubmit={(e) => editCinema(e)}
            >
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Tên rạp:
                </label>
                <input
                  type='text'
                  name='cinema_name'
                  value={cinemaChosen.cinema_name}
                  placeholder='Nhập tên rạp...'
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
                  className='w-full px-3 py-2 rounded-md sm:w-2/3'
                />
              </div>
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Email:
                </label>
                <input
                  type='text'
                  name='email'
                  value={cinemaChosen.email}
                  placeholder='Nhập email...'
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
                  className='w-full px-3 py-2 rounded-md sm:w-2/3'
                />
              </div>
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Hotline:
                </label>
                <input
                  type='text'
                  name='hotline'
                  value={cinemaChosen.hotline}
                  placeholder='Nhập hotline...'
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
                  className='w-full px-3 py-2 rounded-md sm:w-2/3'
                />
              </div>
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Địa chỉ:
                </label>
                <textarea
                  name='address'
                  value={cinemaChosen.address}
                  placeholder='Nhập địa chỉ...'
                  onChange={(e) => handleChange(e)}
                  className='w-full px-2 py-1 rounded-md resize-none sm:w-2/3'
                />
              </div>
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Ảnh URL:
                </label>
                <input
                  type='text'
                  name='image_url'
                  value={cinemaChosen.image_url}
                  placeholder='Nhập URL...'
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
                  className='w-full px-3 py-2 rounded-md sm:w-2/3'
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
            <button className='btn-dark px-3 py-1' onClick={() => toggle()}>
              Thêm rạp
            </button>
            <table className='table mt-6'>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên rạp</th>
                  <th>Địa chỉ</th>
                  <th>Email</th>
                  <th>Hotline</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {cinemaData.map((cinemaItem, index) => {
                  const {
                    id,
                    cinema_name,
                    address,
                    email,
                    hotline,
                  } = cinemaItem;

                  return (
                    <tr key={index}>
                      <td>{id}</td>
                      <td>{cinema_name}</td>
                      <td>{address}</td>
                      <td>{email}</td>
                      <td>{hotline}</td>
                      <td>
                        <button
                          className='btn-dark mr-2 my-1 px-2 py-1'
                          onClick={() => showEdit(id)}
                        >
                          <i className='fas fa-edit'></i>
                        </button>
                        <button
                          className='btn-dark my-1 px-2 py-1'
                          onClick={() => deleteCinema(id)}
                        >
                          <i className='fas fa-trash-alt'></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddCinema isShowing={isShowing} toggle={toggle} addCinema={addCinema} />
    </Fragment>
  );
};

export default Cinema;
