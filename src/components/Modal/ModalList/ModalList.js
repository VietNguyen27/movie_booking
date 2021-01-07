import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './ModalList.css';
import TicketList from './TicketList';
import useOnClickOutside from '../useOnClickOutside';

const Modal = ({ isShowing, toggle, data }) => {
  const modalRef = useRef();

  useOnClickOutside(modalRef, () => toggle());

  return isShowing
    ? ReactDOM.createPortal(
        <div className='modal-list'>
          <div className='modal-content' ref={modalRef}>
            <div className='modal-inner'>
              <div className='list-container'>
                <TicketList data={data} />
              </div>
              <span className='btn btn-close'>
                <i className='fas fa-times' onClick={() => toggle()}></i>
              </span>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
