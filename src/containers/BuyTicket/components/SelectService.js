import React, { Fragment } from 'react';
import './styles/SelectService.css';
import Process from './Process';
import Checkout from './Checkout';

const SelectService = (props) => {
  const {
    seatSelected,
    services,
    serviceSelected,
    handleQuantityDecrease,
    handleQuantityIncrease,
  } = props;

  return (
    <Fragment>
      <Process current={props.order} />
      <div className='flex flex-wrap gap-5 py-4 md:flex-nowrap'>
        <div className='select-service w-full md:w-2/3'>
          <table className='table'>
            <colgroup>
              <col style={{ width: '60%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr className='text-sm sm:text-base'>
                <th className='text-left'>Combo</th>
                <th className='text-right'>Đơn giá</th>
                <th className='text-right'>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {services.map((serviceItem, index) => {
                const { service, price, quantity } = serviceItem;
                return (
                  <tr key={index}>
                    <td className='text-sm sm:text-base'>{service}</td>
                    <td className='text-sm text-right sm:text-base'>
                      {price} đ
                    </td>
                    <td className='product-quantity text-right'>
                      <button
                        className='btn btn-quantity'
                        onClick={() => handleQuantityDecrease(index)}
                      >
                        -
                      </button>
                      <span className='quantity'>{quantity}</span>
                      <button
                        className='btn btn-quantity'
                        onClick={() => handleQuantityIncrease(index)}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Checkout
          props={props}
          seatSelected={seatSelected}
          serviceSelected={serviceSelected}
        />
      </div>
    </Fragment>
  );
};

export default SelectService;
