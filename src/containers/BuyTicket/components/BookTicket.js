import React, { Fragment, useState, useEffect } from 'react';
import './styles/BookTicket.css';
import Process from './Process';
import Checkout from './Checkout';
import useModal from 'components/Modal/useModal';
import ModalAlert from 'components/Modal/ModalAlert/ModalAlert';
import axios from 'axios';

const BookTicket = (props) => {
  const { cinemaId } = props.ticketInfo;
  const { movieId, date, time } = props.movieSelect;
  const { seatSelected, seatBooked, handleSelect, serviceSelected } = props;
  const [cinemaData, setCinemaData] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/cinemas`)
        .then((res) => {
          const cinemaData = res.data;
          setCinemaData(cinemaData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const handleSeats = () => {
    const cinemaSelected = cinemaData.filter(
      (cinema) => cinema.id === cinemaId
    );

    if (cinemaSelected.length !== 0) {
      const seats = cinemaSelected[0].seats;
      const seatsDOM = [];
      for (let row in seats) {
        seatsDOM.push(
          <div key={row} className='row'>
            <span className='row-name'>{row}</span>
            {seats[row].map((seat) => {
              if (
                parseInt(movieId) === props.ticketInfo.movieId &&
                date === props.ticketInfo.date &&
                time === props.ticketInfo.timeSelect
              ) {
                const seatName = seat >= 10 ? row + seat : row + '0' + seat;

                const showSeatSelected = seatSelected.filter(
                  (seat) => seat === seatName
                );

                const showSeatBooked = seatBooked.filter(
                  (seat) => seat === seatName
                );

                return (
                  <div
                    key={seat}
                    className={
                      showSeatSelected[0] === seatName
                        ? 'seat seat-selected'
                        : showSeatBooked[0] === seatName
                        ? 'seat seat-occupied cursor-not-allowed'
                        : 'seat'
                    }
                    onClick={
                      showSeatBooked[0] === seatName
                        ? null
                        : (e) => {
                            handleSelect(e);
                          }
                    }
                  >
                    <span className='seat-name'>{seatName}</span>
                  </div>
                );
              }
            })}
          </div>
        );
      }

      return seatsDOM;
    }
  };

  const handleEmptySeat = () => {
    if (seatSelected.length === 0) {
      toggle();
      return setAlertMessage('Vui lòng chọn ghế');
    }
    setAlertMessage('');
    return props.next();
  };

  return (
    <Fragment>
      <Process current={props.order} />
      <div className='flex flex-wrap gap-5 py-4 md:flex-nowrap'>
        <div className='book-ticket w-full md:w-2/3'>
          <div className='screen-container'>
            <div className='screen'></div>
          </div>
          <div className='seat-container flex justify-center gap-6'>
            <div className='seat-item'>
              <div className='seat'></div>
              <small>Trống</small>
            </div>
            <div className='seat-item'>
              <div className='seat seat-selected'></div>
              <small>Đang chọn</small>
            </div>
            <div className='seat-item'>
              <div className='seat seat-occupied'></div>
              <small>Đã đặt</small>
            </div>
          </div>
          <div className='seats'>{handleSeats()}</div>
        </div>
        <Checkout
          props={props}
          seatSelected={seatSelected}
          serviceSelected={serviceSelected}
          handleEmptySeat={handleEmptySeat}
        />
      </div>
      <ModalAlert
        isShowing={isShowing}
        toggle={toggle}
        alertMessage={alertMessage}
      />
    </Fragment>
  );
};

export default BookTicket;
