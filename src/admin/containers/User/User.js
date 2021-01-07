import React, { Fragment, useState, useEffect } from 'react';
import './styles/User.css';
import Title from 'components/PageTitle/Title';
import AddUser from './AddUser';
import useModal from 'components/Modal/useModal';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const User = () => {
  const initialDefaultValue = {
    name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    image_url: 'https://static.thenounproject.com/png/363640-200.png',
    address: '',
    isAdmin: null,
  };
  const [userData, setUserData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [userChosen, setUserChosen] = useState(initialDefaultValue);
  const [editable, setEditable] = useState(false);
  const excludeColumns = ['id', 'password', 'image_url', 'isAdmin'];
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/users')
        .then((res) => {
          const userData = res.data;
          setUserData(userData);
          setSearchResult(userData);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  const addUser = (user) => {
    const {
      name,
      email,
      password,
      address,
      image_url,
      phone_number,
      position,
    } = user;
    axios
      .post('http://localhost:5000/users', {
        id: uuidv4(),
        name,
        phone_number,
        email,
        password,
        address,
        image_url,
        isAdmin: position === 'admin' ? true : false,
      })
      .then((res) => {
        setUserData([...userData, res.data]);
        setSearchResult([...userData, res.data]);
      })
      .catch((error) => console.log(error));
  };

  const showEdit = (id) => {
    setEditable(true);
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        const userData = res.data;
        setUserChosen({
          ...userData,
          isAdmin: userData.isAdmin ? 'admin' : 'user',
        });
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = (id) => {
    const newUser = userData.filter((user) => user.id !== id);
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setUserData(newUser);
        setSearchResult(newUser);
      })
      .catch((error) => console.log(error));
  };

  const editUser = (e) => {
    e.preventDefault();
    const {
      id,
      name,
      phone_number,
      email,
      password,
      address,
      image_url,
      isAdmin,
    } = userChosen;

    const newUsers = searchResult.map((user) => {
      if (user.id === userChosen.id) {
        user = userChosen;
        user.isAdmin = user.isAdmin === 'admin' ? true : false;
      }
      return user;
    });

    axios
      .put(`http://localhost:5000/users/${id}`, {
        id,
        name,
        phone_number,
        email,
        password,
        address,
        image_url,
        isAdmin: isAdmin === 'admin' ? true : false,
      })
      .then((res) => {
        setSearchResult(newUsers);
      })
      .catch((error) => console.log(error));
    setUserChosen(initialDefaultValue);
    setEditable(false);
  };

  const filterData = (e) => {
    const lowercasedValue = e.target.value.toLowerCase().trim();
    if (lowercasedValue === '') setUserData(userData);
    else {
      const filteredData = userData.filter((item) => {
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
    setUserChosen({ ...userChosen, [name]: value });
  };

  return (
    <Fragment>
      <div className='px-4 py-3'>
        <Title title='Danh sách Người dùng' />
        {editable ? (
          <div className='content bg-white w-full mt-6 px-4 py-3'>
            <div className='flex justify-end'>
              <button
                className='btn-dark px-3 py-1'
                onClick={() => {
                  setUserChosen(initialDefaultValue);
                  setEditable(false);
                }}
              >
                <i className='fas fa-reply'></i>
              </button>
            </div>
            <form
              className='form m-auto px-4 pt-6 sm:px-8'
              onSubmit={(e) => editUser(e)}
            >
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Tên người dùng:
                </label>
                <input
                  type='text'
                  name='name'
                  value={userChosen.name}
                  placeholder='Nhập tên người dùng...'
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
                  value={userChosen.email}
                  placeholder='Nhập email...'
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
                  className='w-full px-3 py-2 rounded-md sm:w-2/3'
                />
              </div>
              <div className='input-group flex flex-wrap justify-between items-center mb-2 sm:mb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Chức năng:
                </label>
                <select
                  className='w-full px-2 py-2 rounded-md sm:w-2/3'
                  name='isAdmin'
                  value={userChosen.isAdmin}
                  onChange={(e) => handleChange(e)}
                >
                  <option value='admin'>Nhà quản trị</option>
                  <option value='user'>Người dùng</option>
                </select>
              </div>
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Số điện thoại:
                </label>
                <input
                  type='text'
                  name='phone_number'
                  value={userChosen.phone_number}
                  placeholder='Nhập số điện thoại...'
                  onChange={(e) => handleChange(e)}
                  autoComplete='off'
                  className='w-full px-3 py-2 rounded-md sm:w-2/3'
                />
              </div>
              <div className='input-group flex flex-wrap justify-between items-center pb-2 sm:pb-4'>
                <label className='w-full font-bold block sm:inline-block sm:w-auto'>
                  Ảnh URL:
                </label>
                <input
                  type='text'
                  name='image_url'
                  value={userChosen.image_url}
                  placeholder='Nhập URL...'
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
                  value={userChosen.address}
                  placeholder='Nhập địa chỉ...'
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
                Thêm người dùng
              </button>
            </div>
            <table className='table mt-6'>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Chức năng</th>
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
                  searchResult.map((userItem, index) => {
                    const {
                      id,
                      name,
                      email,
                      phone_number,
                      address,
                      isAdmin,
                    } = userItem;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone_number}</td>
                        <td>{address}</td>
                        <td>{isAdmin ? 'Nhà quản trị' : 'Người dùng'}</td>
                        <td>
                          <button
                            className='btn-dark mr-2 my-1 px-2 py-1'
                            onClick={() => showEdit(id)}
                          >
                            <i className='fas fa-edit'></i>
                          </button>
                          <button
                            className='btn-dark my-1 px-2 py-1'
                            onClick={() => deleteUser(id)}
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
      <AddUser isShowing={isShowing} toggle={toggle} addUser={addUser} />
    </Fragment>
  );
};

export default User;
