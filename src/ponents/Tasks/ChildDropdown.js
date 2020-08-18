import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';
import './tasks.css';

function ChildDropdown() {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const toggle = () => setOpen(!open);
  const listChildren = children.map((child) =>
    <li>
      <button onClick={() => setTitle(child)}>
        {child}
      </button>
    </li>
  )
  ChildDropdown.handleClickOutside = () => setOpen(false);

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
          {listChildren}
        </ul>
      )}
    </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => ChildDropdown.handleClickOutside,
};

export default onClickOutside(ChildDropdown, clickOutsideConfig);