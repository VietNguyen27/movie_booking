import React, { useState, useEffect } from 'react';
import './styles/CinemaBranch.css';
import Tabs from 'components/Tabs/Tabs';
import axios from 'axios';

const CinemaBranch = () => {
  const [cinemaData, setCinemaData] = useState([]);

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
    <div className='cinema-container py-8'>
      <div className='clearfix bg-primary py-6 rounded-xl'>
        <h1 className='text-secondary text-xl font-bold uppercase text-center pb-4 sm:text-2xl'>
          Ciname Đà Nẵng
        </h1>
        <div className='cinema px-4 pb-0 sm:px-8 sm:pb-4'>
          {cinemaData.length === 0 ? (
            <Tabs>
              <div label='Cinema Nguyễn Tất Thành'></div>
              <div label='Cinema Điện Biên Phủ'></div>
              <div label='Cinema Võ Văn Kiệt'></div>
              <div label='Cinema Trưng Nữ Vương'></div>
            </Tabs>
          ) : (
            <Tabs className='pt-4'>
              {cinemaData.map((cinema, index) => {
                const {
                  cinema_name,
                  address,
                  email,
                  hotline,
                  image_url,
                } = cinema;
                return (
                  <div key={index} label={cinema_name} onClick={getDate}>
                    <div className='theater'>
                      <h1 className='text-center text-2xl uppercase font-bold sm:text-4xl'>
                        <span>Theater</span>
                      </h1>
                      <span className='line-through'></span>
                    </div>
                    <h1 className='text-center text-lg font-medium py-4 sm:text-2xl'>
                      {cinema_name}
                    </h1>
                    <div className='theater-details'>
                      <img
                        src={image_url}
                        alt=''
                        style={{ minHeight: '180px' }}
                      />
                      <div className='theater-info px-4 pt-4 pb-4 sm:pb-8'>
                        <h2 className='address'>{address}</h2>
                        <h2 className='email'>
                          <span className='font-bold'>Email: </span>
                          {email}
                        </h2>
                        <h2 className='hotline'>
                          <span className='font-bold'>Hotline: </span>
                          {hotline}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaBranch;
