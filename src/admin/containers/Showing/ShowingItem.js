import React, { Fragment, useState, useEffect } from 'react';
import { convertDate, formatMoney, formatTime } from 'utils/Convert';
import AddShowing from './AddShowing';
import useModal from 'components/Modal/useModal';
import axios from 'axios';

const ShowingItem = ({ id }) => {
  const [showingData, setShowingData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const excludeColumns = ['id', 'cinemaId', 'movieId', 'userId', 'date'];
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `http://localhost:5000/cinemas/${id}/showings/?_expand=movie&_expand=cinema`
        )
        .then((res) => {
          const showingData = res.data;
          setShowingData(showingData);
          setSearchResult(showingData);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const filterData = (e) => {
    const lowercasedValue = e.target.value.toLowerCase().trim();
    if (lowercasedValue === '') setShowingData(showingData);
    else {
      const filteredData = showingData.filter((item) => {
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
    <Fragment>
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
          Thêm lịch chiếu
        </button>
      </div>
      <table className='table mt-6'>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên phim</th>
            <th>Giá</th>
            <th>Ngày</th>
            <th>Suất chiếu</th>
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
            searchResult.map((showingItem, index) => {
              const { movie, date, price, times } = showingItem;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{movie.title}</td>
                  <td>{formatMoney(price)} đ</td>
                  <td>{convertDate(date)}</td>
                  <td className='grid grid-cols-1 lg:grid-cols-2'>
                    {times.map((time, index) => {
                      const { start_time, end_time } = time;
                      return (
                        <p key={index}>
                          {`${formatTime(start_time)} - ${formatTime(
                            end_time
                          )}`}
                        </p>
                      );
                    })}
                  </td>
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
      <AddShowing isShowing={isShowing} toggle={toggle} />
    </Fragment>
  );
};

export default ShowingItem;
