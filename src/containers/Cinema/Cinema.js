import React from 'react';
import Title from 'components/PageTitle/Title';
import CinemaBranch from './components/CinemaBranch';

const Cinema = () => {
  return (
    <div>
      <Title title={'Hệ thống rạp Cinema'} />
      <CinemaBranch />
    </div>
  );
};

export default Cinema;
