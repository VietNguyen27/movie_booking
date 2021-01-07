import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-top py-0 sm:py-4'>
        <div className='container'>
          <div className='grid grid-cols-1 sm:grid-cols-3'>
            <div className='text-base sm:text-lg'>
              <h3 className='font-semibold pb-2 hidden sm:block'>
                Cinema Đà Nẵng
              </h3>
              <ul>
                <li>
                  <a href='/#'>Giới thiệu</a>
                </li>
                <li>
                  <a href='/#'>Tuyển dụng</a>
                </li>
                <li>
                  <a href='/#'>Liên hệ quảng cáo</a>
                </li>
              </ul>
            </div>
            <div className='text-base sm:text-lg'>
              <h3 className='font-semibold pb-2 hidden sm:block'>
                Điều khoản sử dụng
              </h3>
              <ul>
                <li>
                  <a href='/#'>Điều khoản chung</a>
                </li>
                <li>
                  <a href='/#'>Điều khoản giao dịch</a>
                </li>
                <li>
                  <a href='/#'>Chính sách thanh toán</a>
                </li>
                <li>
                  <a href='/#'>Chính sách bảo mật</a>
                </li>
                <li>
                  <a href='/#'>Câu hỏi thường gặp</a>
                </li>
              </ul>
            </div>
            <div className='info text-base sm:text-lg'>
              <h3 className='font-semibold pb-2'>Chăm sóc khách hàng</h3>
              <ul>
                <li>Hotline: 012345678</li>
                <li>Giờ làm việc: 8:00 - 22:00</li>
                <li>Email: hoidap@cinema.vn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright bg-primary'>
        <div className='container'>
          <p className='text-secondary text-base font-semibold py-3 sm:text-lg'>
            Copyright &copy; 2020 Ciname Đà Nẵng
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
