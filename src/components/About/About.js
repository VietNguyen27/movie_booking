import React from 'react';
import Logo from 'images/logo.png';

const About = () => {
  return (
    <div className='w-full flex flex-col text-center mt-4 md:w-1/3 md:text-left md:mt-0'>
      <div className='m-auto md:m-0'>
        <img src={Logo} alt='' className='logo' />
      </div>
      <h2 className='subtitle text-2xl font-semibold'>Cinema Đà Nẵng</h2>
      <small className='desc text-sm font-semibold pb-2'>
        Địa chỉ: Hoàng Diệu, Phường Bình Thuận, Quận Hải Châu, TP.Đà Nẵng
      </small>
      <p className='text-sm text-justify pb-2'>
        Tại Cinema, bạn được chúng tôi truyền đạt cảm xúc âm thanh đích thực từ
        tác phẩm điện ảnh.
      </p>
      <p className='text-sm text-justify pb-2'>
        Cinema luôn hướng đến một môi trường giải trí thanh lịch và thân thiện,
        tạo cho bạn cảm giác thoải mái và gần gũi khi thưởng thức cà phê, ăn
        nhẹ, cùng xem một bộ phim với người yêu, bạn bè hay người thân trong gia
        đình.
      </p>
      <p className='text-sm text-justify pb-2'>
        Và đặc biệt hơn hết, chi phí thân thiện tại Cinema tạo điều kiện cho bạn
        thưởng thức nhiều tác phẩm điện ảnh lớn của Việt Nam và thế giới trên
        màn ảnh rộng mà không sợ tốn kém.
      </p>
    </div>
  );
};

export default About;
