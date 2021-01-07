import React, { useState, useEffect } from 'react';
import { Steps, Step } from 'react-step-builder';
import BookTicket from './components/BookTicket';
import SelectService from './components/SelectService';
import CheckInfo from './components/CheckInfo';
import Payment from './components/Payment';
import axios from 'axios';

const BuyTicket = (props) => {
  const { movieId, cinemaId, date, time } = props.match.params;
  const [ticketInfo, setTicketInfo] = useState({});
  const [seatSelected, setSeatSelected] = useState([]);
  const [seatBooked, setSeatBooked] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `http://localhost:5000/cinemas/${cinemaId}/showings?_expand=movie&_expand=cinema&movieId=${movieId}&date=${date}`
        )
        .then((res) => {
          setTicketInfo({ ...res.data[0], timeSelect: time });
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://localhost:5000/tickets').then((res) => {
        const ticketData = res.data.filter((ticket) => {
          return (
            ticket.cinemaId === parseInt(cinemaId) &&
            ticket.movieId === parseInt(movieId) &&
            ticket.date === date &&
            ticket.timeSelect === time
          );
        });
        const totalSeatBooked = ticketData.map((ticket) => ticket.seats);
        setSeatBooked([].concat.apply([], totalSeatBooked));
      });

      axios
        .get('http://localhost:5000/services')
        .then((res) => {
          const serviceData = res.data.map((serviceItem) => ({
            ...serviceItem,
            quantity: 0,
          }));
          setServices(serviceData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  console.log(ticketInfo);

  const handleSelect = (e) => {
    let { className, textContent } = e.target;
    const seatSelect = textContent;

    if (className === 'seat') {
      e.target.className = 'seat seat-selected';
      return setSeatSelected([...seatSelected, seatSelect]);
    } else {
      e.target.className = 'seat';
      const newSeats = seatSelected.filter((e) => e !== seatSelect);
      return setSeatSelected(newSeats);
    }
  };

  const handleQuantityDecrease = (index) => {
    const newServices = [...services];
    if (newServices[index].quantity > 0) {
      newServices[index].quantity -= 1;

      setServices(newServices);
      const serviceSelectedFilter = [
        ...serviceSelected,
        newServices[index],
      ].filter((serviceItem, index, arr) => arr.indexOf(serviceItem) === index);
      setServiceSelected(serviceSelectedFilter);
    }
    return null;
  };

  const handleQuantityIncrease = (index) => {
    const newServices = [...services];
    if (newServices[index].quantity < 10) {
      newServices[index].quantity += 1;

      setServices(newServices);
      const serviceSelectedFilter = [
        ...serviceSelected,
        newServices[index],
      ].filter((serviceItem, index, arr) => arr.indexOf(serviceItem) === index);
      setServiceSelected(serviceSelectedFilter);
    }
    return null;
  };

  return (
    <div>
      <Steps>
        <Step
          movieSelect={props.match.params}
          ticketInfo={ticketInfo}
          seatSelected={seatSelected}
          seatBooked={seatBooked}
          serviceSelected={serviceSelected}
          handleSelect={handleSelect}
          component={BookTicket}
        />
        <Step
          ticketInfo={ticketInfo}
          seatSelected={seatSelected}
          services={services}
          serviceSelected={serviceSelected}
          handleQuantityDecrease={handleQuantityDecrease}
          handleQuantityIncrease={handleQuantityIncrease}
          component={SelectService}
        />
        <Step
          ticketInfo={ticketInfo}
          seatSelected={seatSelected}
          serviceSelected={serviceSelected}
          component={CheckInfo}
        />
        <Step
          ticketInfo={ticketInfo}
          seatSelected={seatSelected}
          serviceSelected={serviceSelected}
          component={Payment}
        />
      </Steps>
    </div>
  );
};

export default BuyTicket;
