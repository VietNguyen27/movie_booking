import React, { Fragment, useState, useEffect } from 'react';
import './styles/Showing.css';
import Title from 'components/PageTitle/Title';
import Tabs from 'components/Tabs/Tabs';
import ShowingItem from './ShowingItem';
import AddShowing from './AddShowing';
import useModal from 'components/Modal/useModal';
import axios from 'axios';

const Showing = () => {
  const [cinemaData, setCinemaData] = useState([]);
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

  const getDate = () => {};

  return (
    <div className='px-4 py-3'>
      <Title title='Danh sách Lịch chiếu' />
      <div className='content bg-white w-full mt-6 px-4 py-3'>
        {cinemaData.length !== 0 ? (
          <Tabs>
            {cinemaData.map((cinema, index) => {
              const { id, cinema_name } = cinema;
              return (
                <div key={index} label={cinema_name} onClick={getDate}>
                  <ShowingItem id={id} />
                </div>
              );
            })}
          </Tabs>
        ) : (
          <Tabs>
            <div label='Cinema Nguyễn Tất Thành'></div>
            <div label='Cinema Điện Biên Phủ'></div>
            <div label='Cinema Võ Văn Kiệt'></div>
            <div label='Cinema Trưng Nữ Vương'></div>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Showing;
