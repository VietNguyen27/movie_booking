import React, { Component } from 'react';

export class Tab extends Component {
  onClick = () => {
    const { label, date, getDate, onClick } = this.props;
    onClick(label);
    getDate(date);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className = 'tab-list-item active';
    }

    return (
      <li
        className={`${className} cursor-pointer text-base text-center font-bold uppercase duration-500 md:text-xl sm:text-lg`}
        onClick={onClick}
      >
        {label}
      </li>
    );
  }
}

export default Tab;
