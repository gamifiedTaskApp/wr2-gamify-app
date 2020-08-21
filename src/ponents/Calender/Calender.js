import React, { useState } from "react";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import onClickOutside from 'react-onclickoutside';
import Axios from "axios"

function Calender(props) {

  const [today] = useState(new Date());
  today.setHours(0, 0, 0, 0)
  const [minWeek] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7))

  function chooseDate(e){
    props.setSelectedDate(e);
    let date = e;
    let childId = props.childId
    Axios.post(`/api/child/tasks`, {childId, date})
    .then(newRes => {
      console.log(newRes.data) //I hate this line
      props.setTasks(newRes.data)
    })
  }

  Calender.handleClickOutside = () => props.setIsOpen(false);
  console.log(today)
  return (
    <div>
      <InfiniteCalendar
        onSelect={e => chooseDate(e)}
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