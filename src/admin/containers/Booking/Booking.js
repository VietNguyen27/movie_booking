import React, { useState, useEffect } from 'react';
import './styles/Booking.css';
import Title from 'components/PageTitle/Title';
import { convertList, convertDate, formatTime } from 'utils/Convert';
import axios from 'axios';

const Booking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const excludeColumns = ['id', 'cinemaId', 'movieId', 'userId', 'date'];

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          'http://localhost:5000/tickets?_expand=user&_expand=movie&_expand=cinema'
        )
        .then((res) => {
          const bookingData = res.data;
          setBookingData(bookingData);
          setSearchResult(bookingData);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const filterData = (e) => {
    const lowercasedValue = e.target.value.toLowerCase().trim();
    if (lowercasedValue === '') setBookingData(bookingData);
    else {
      const filteredData = bookingData.filter((item) => {
        return Object.keys(item).some((key) => {
          if (item[key].constructor === Object) {
            return Object.keys(item[key]).some((k) =>
              excludeColumns.includes(k)
                ? false
                : item[key][k]
                    .toString()
                    .toLowerCase()
                    .includes(lowercasedValue)
            );
          }
          return excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue);
        });
      });
      setSearchResult(filteredData);
    }
  };

  return (
    <div className='px-4 py-3'>
      <Title title='Danh sách Vé' />
      <div className='content bg-white w-full mt-6 px-4 py-3'>
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
        <table className='table mt-6'>
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>STT</th>
              <th>Email</th>
              <th>Phim</th>
              <th>Rạp</th>
              <th>Ngày</th>
              <th>Suất chiếu</th>
              <th>Ghế</th>
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
              searchResult.map((bookingItem, index) => {
                const {
                  user,
                  cinema,
                  date,
                  movie,
                  seats,
                  timeSelect,
                } = bookingItem;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{movie.title}</td>
                    <td>{cinema.cinema_name}</td>
                    <td>{convertDate(date)}</td>
                    <td>{formatTime(timeSelect)}</td>
                    <td>{convertList(seats)}</td>
                    <td>
                      <button className='btn-dark mr-2 my-1 px-2 py-1'>
                        <i className='fas fa-edit'></i>
                      </button>
                      <button className='btn-dark my-1 px-2 py-1'>
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
    </div>
  );
};

export default Booking;
