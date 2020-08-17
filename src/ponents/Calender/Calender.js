import React, { useState } from "react";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import onClickOutside from 'react-onclickoutside';

function Calender(props) {

  const [today] = useState(new Date());
  const [minWeek] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7))

  Calender.handleClickOutside = () => props.setIsOpen(false);

  return (
    <div>
      <InfiniteCalendar
        onSelect={props.setSelectedDate}
        minDate={minWeek}
        min={minWeek}
        maxDate={new Date(2022, 0, 1)}
        displayOptions={{
          showHeader: false,
          shouldHeaderAnimate: false
        }} />
    </div>
  )
};

const clickOutsideConfig = {
  handleClickOutside: () => Calender.handleClickOutside,
};

export default onClickOutside(Calender, clickOutsideConfig);