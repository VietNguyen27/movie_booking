import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './ModalVideo.css';
import useOnClickOutside from '../useOnClickOutside';

const Modal = ({ isShowing, toggle, trailer_url }) => {
  const modalRef = useRef();

  useOnClickOutside(modalRef, () => toggle());

  return isShowing
    ? ReactDOM.createPortal(
        <div className='modal modal-video'>
          <div className='modal-content' ref={modalRef}>
            <iframe
              width='100%'
              height='100%'
              src={trailer_url}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
