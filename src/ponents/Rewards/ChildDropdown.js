import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';

function ChildDropdown(props) {

    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    const [children, setChildren] = useState([]);
    const childName = children[0] ? children[0].child_username : "";
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        if (!props.isChild) {
            axios.get(`/api/parents/children/${props.userId}`)
            .then(res => {
                setChildren(res.data)
                setTitle(res.data[0].child_username)
            });
        };
    }, [props.isChild]);
    
    const listChildren = children.map((child, i) =>
    <li key={i}>
      <button onClick={() => setTitle(child.child_username)}>
        {child.child_username}
      </button>
    </li>
  )
  ChildDropdown.handleClickOutside = () => setOpen(false);

  console.log(children)

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