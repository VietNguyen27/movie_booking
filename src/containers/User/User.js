import React, { Fragment, useState, useEffect } from 'react';
import './User.css';
import ModalList from 'components/Modal/ModalList/ModalList';
import useModal from 'components/Modal/useModal';
import { formatMoney } from 'utils/Convert';
import axios from 'axios';

const User = (props) => {
  const initialDefaultValue = {
    id: '',
    name: '',
    phone_number: '',
    email: '',
    password: '',
    address: '',
    image_url: '',
  };

  const { userId } = props.match.params;
  const { isShowing, toggle } = useModal();
  const [editable, setEditable] = useState(false);
  const [valueChanged, setValueChanged] = useState(initialDefaultValue);
  const [userData, setUserData] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const { id, email, password, image_url } = userData;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((res) => {
          const userData = res.data;
          setUserData(userData);
          setValueChanged({
            name: userData.name,
            phone_number: userData.phone_number,
            password: userData.password,
            address: userData.address,
            image_url: userData.image_url,
          });
        })
        .catch((error) => console.log(error));

      axios
        .get(
          `http://localhost:5000/users/${userId}/tickets/?_expand=movie&_expand=cinema`
        )
        .then((res) => {
          const ticketData = res.data;
          setTicketData(ticketData);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const totalAmountPaid = () => {
    if (ticketData) {
      let totalAmountSeats = 0;
      let totalAmountOrders = 0;
      ticketData.map((ticket) => {
        totalAmountSeats += ticket.price * ticket.seats.length;
        totalAmountOrders += ticket.orders.reduce((acc, cur) => {
          return acc + cur.price * cur.quantity;
        }, 0);
      });
      return (totalAmountSeats + totalAmountOrders) * 1.1;
    }
    return 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValueChanged({ ...valueChanged, [name]: value });
  };

  const saveInfo = () => {
    axios.put(`http://localhost:5000/users/${userId}`, {
      id,
      name: valueChanged.name,
      phone_number: valueChanged.phone_number,
      email,
      password,
      address: valueChanged.address,
      image_url,
    });
    updateSession({
      id,
      name: valueChanged.name,
      phone_number: valueChanged.phone_number,
      email,
      password,
      address: valueChanged.address,
      image_url,
    });
    window.location.reload();
    setEditable(false);
  };

  const updateSession = (value) => {
    let prevData = JSON.parse(sessionStorage.getItem('user'));
    Object.keys(value).forEach(function (val, key) {
      prevData[val] = value[val];
    });
    sessionStorage.setItem('user', JSON.stringify(prevData));
  };

  return (
    <Fragment>
      <div className='user-container flex flex-wrap gap-6 pt-0 pb-24 md:flex-nowrap sm:pt-4'>
        <div className='user-left w-full flex flex-wrap gap-4 md:w-2/3 sm:flex-nowrap'>
          <div className='flex flex-col gap-3 items-center w-full sm:w-auto'>
            <img src={image_url} alt='' />
            <button onClick={() => setEditable(true)}>
              Chỉnh sửa thông tin cá nhân
            </button>
          </div>
          {editable ? (
            <div className='flex flex-col gap-1 m-auto sm:w-auto'>
              <input
                type='text'
                name='name'
                autoComplete='off'
                value={valueChanged.name}
                onChange={(e) => onChange(e)}
              />
              <p className='text-base'>
                <span className='info-label'>Email:</span> {email}
              </p>
              <div className='flex items-center'>
                <span className='info-label text-base'>Mật khẩu:</span>
                <input
                  type='password'
                  name='phone_number'
                  className='w-full my-1'
                  autoComplete='off'
                  value={valueChanged.password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='flex items-center'>
                <span className='info-label text-base'>Điện thoại:</span>
                <input
                  type='text'
                  name='phone_number'
                  className='w-full my-1'
                  autoComplete='off'
                  value={valueChanged.phone_number}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='flex items-center'>
                <span className='info-label text-base'>Địa chỉ:</span>
                <input
                  type='text'
                  name='address'
                  className='w-full my-1'
                  autoComplete='off'
                  value={valueChanged.address}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button
                className='btn btn-secondary rounded-md my-2 py-2'
                onClick={() => saveInfo()}
              >
                Lưu thông tin
              </button>
              <button
                className='btn btn-primary rounded-md py-2'
                onClick={() => setEditable(false)}
              >
                Hủy bỏ
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-1 m-auto sm:w-auto'>
              <h2 className='text-3xl font-medium pb-2'>{valueChanged.name}</h2>
              <p className='text-base'>
                <span className='info-label'>Email:</span>
                {email}
              </p>
              <p className='text-base'>
                <span className='info-label'>Mật khẩu:</span>
                **********
              </p>
              <p className='text-base'>
                <span className='info-label'>Điện thoại:</span>
                {valueChanged.phone_number}
              </p>
              <p className='text-base'>
                <span className='info-label'>Địa chỉ:</span>
                {valueChanged.address}
              </p>
            </div>
          )}
        </div>
        <div className='user-right w-full flex flex-col items-center gap-2 py-2 md:w-1/3 md:flex-col md:justify-start sm:flex-row sm:justify-between sm:items-start'>
          <button className='text-left text-lg' onClick={() => toggle()}>
            <i className='fas fa-ticket-alt pr-2'></i>Số phim đã đặt:
            <span className='bg-dark-blue text-white font-bold mx-2 px-2 py-1'>
              {ticketData ? ticketData.length : 0}
            </span>
          </button>
          <p className='text-lg'>
            <i className='fas fa-wallet pr-2'></i>Tổng số tiền đã chi trả:
            <span className='text-2xl block font-medium pr-1'>
              {formatMoney(totalAmountPaid())} đ
            </span>
          </p>
        </div>
      </div>
      <ModalList isShowing={isShowing} toggle={toggle} data={ticketData} />
    </Fragment>
  );
};

export default User;
