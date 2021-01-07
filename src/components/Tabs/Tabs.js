import React, { Component } from 'react';
import Tab from './Tab';

export class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onChangeTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onChangeTabItem,
      props: { children },
      state: { activeTab },
    } = this;

    return (
      <div className='tabs'>
        <ul className='tab-list flex justify-center gap-5 my-6'>
          {children.map((child) => {
            const { label, date, onClick } = child.props;
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                date={date}
                getDate={onClick}
                onClick={onChangeTabItem}
              />
            );
          })}
        </ul>
        <div className={`tab-content ${this.props.className}`}>
          {children.map((child) => {
            if (child.props.label !== activeTab) return null;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
