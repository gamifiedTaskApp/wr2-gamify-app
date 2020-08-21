import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import "./tasks.css";

function DayDropdown(props) {
  const [open, setOpen] = useState(false);
  const [days] = useState([
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ]);
  const toggle = () => setOpen(!open);
  const listDays = days.map((day) => (
    <li>
      <button onClick={() => props.setTitle(day)}>{day}</button>
    </li>
  ));
  DayDropdown.handleClickOutside = () => setOpen(false);
  return (
    <div>
      <div
        tabIndex={0}
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div>
          <p>{props.title}</p>
        </div>
        <div>
          <p>{open ? "Close" : "Open"}</p>
        </div>
      </div>
      {open && <ul>{listDays}</ul>}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => DayDropdown.handleClickOutside,
};

export default onClickOutside(DayDropdown, clickOutsideConfig);
