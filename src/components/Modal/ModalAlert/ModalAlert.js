import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './ModalAlert.css';
import useOnClickOutside from '../useOnClickOutside';

const Modal = ({ isShowing, toggle, alertMessage }) => {
  const modalRef = useRef();

  useOnClickOutside(modalRef, () => toggle());

  return isShowing
    ? ReactDOM.createPortal(
        <div className='modal modal-alert'>
          <div className='modal-content' ref={modalRef}>
            <div className='modal-inner'>
              <p className='text-lg'>{alertMessage}</p>
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
