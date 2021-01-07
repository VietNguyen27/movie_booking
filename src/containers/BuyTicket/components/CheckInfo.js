import React, { Fragment } from 'react';
import './styles/CheckInfo.css';
import Process from './Process';
import Checkout from './Checkout';
import { formatMoney } from 'utils/Convert';

const CheckInfo = (props) => {
  const { price } = props.ticketInfo;
  const { seatSelected, serviceSelected } = props;

  const handleTotal = () => {
    if (serviceSelected && serviceSelected.length !== 0) {
      const sumServicePrice = serviceSelected.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
      return price * seatSelected.length + sumServicePrice;
    }
    return price * seatSelected.length;
  };

  return (
    <Fragment>
      <Process current={props.order} />
      <div className='flex flex-wrap gap-5 py-4 md:flex-nowrap'>
        <div className='check-info w-full md:w-2/3'>
          <table className='table'>
            <colgroup>
              <col style={{ width: '54%' }} />
              <col style={{ width: '23%' }} />
              <col style={{ width: '23%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className='table-title text-sm sm:text-base' colSpan='3'>
                  Tóm tắt đơn hàng
                </th>
              </tr>
              <tr className='text-sm sm:text-base'>
                <th className='text-left'>Mô tả</th>
                <th className='text-center'>Số lượng</th>
                <th className='text-right'>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-sm sm:text-base'>
                <td>Vé xem phim</td>
                <td className='text-center'>{seatSelected.length}</td>
                <td className='text-right'>
                  {formatMoney(price * seatSelected.length)}
                </td>
              </tr>
              {serviceSelected
                .filter((e) => e.quantity > 0)
                .map((serviceItem, index) => {
                  const { service, price, quantity } = serviceItem;
                  return (
                    <tr key={index}>
                      <td>{service}</td>
                      <td className='text-center'>{formatMoney(quantity)}</td>
                      <td className='text-right'>
                        {formatMoney(price * quantity)}
                      </td>
                    </tr>
                  );
                })}
              <tr className='text-sm sm:text-base'>
                <td>
                  <p className='text-red'>Phí dịch vụ</p>
                  <small className='text-service text-justify text-sm'>
                    Phí dịch vụ đảm bảo cho bạn các quyền lợi sau: hủy vé - hoàn
                    tiền trước giờ chiếu 60 phút, tích điểm nhận quà xịn xò và
                    có cơ hội tham gia các sự kiện premiere phim mới.
                  </small>
                </td>
                <td className='text-center text-red'>10%</td>
                <td className='text-right text-red'>
                  {formatMoney(handleTotal() * 0.1)}
                </td>
              </tr>
              <tr className='text-sm sm:text-base'>
                <td colSpan='2'>Tổng</td>
                <td className='text-right font-medium'>
                  {formatMoney(handleTotal() * 1.1)}
                </td>
              </tr>
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

export default CheckInfo;
