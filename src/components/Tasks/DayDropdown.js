import React, { useState } from './node_modules/react';
import onClickOutside from './node_modules/react-onclickoutside';
import './tasks.css';

function DayDropdown() {

  const [open, setOpen] = useState(false);
  const [days] = useState(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']);
  const [title, setTitle] = useState('');
  const toggle = () => setOpen(!open);
  const listDays = days.map((day) =>
    <li>
      <button onClick={() => setTitle(day)}>
        {day}
      </button>
    </li>
  )
  DayDropdown.handleClickOutside = () => setOpen(false);

  return (
    <div>
      <div
        tabIndex={0}
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}>
        <div>
          <p>{title}</p>
        </div>
        <div>
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul>
          {listDays}
        </ul>
      )}
    </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => DayDropdown.handleClickOutside,
};

export default onClickOutside(DayDropdown, clickOutsideConfig);