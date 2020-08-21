import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';
import './tasks.css';

function ChildDropdown(props) {

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (!props.isChild) {
      axios.get(`/api/parents/children/${props.userId}`)
        .then(res => {
          setChildren(res.data)
        });
    };
  }, [props.isChild]);

  const listChildren = children.map((child, i) =>
    <li key={i}>
      <button onClick={() => props.setTitle(child.child_username)}>
        {child.child_username}
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
          <p>{props.title}</p>
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