import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';
import './tasks.css';

function ChildDropdown(props) {

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    axios.get(`/api/parents/children/${props.userId}`)
    .then(res => {
        setChildren(res.data)
        props.setTitle(res.data[0].child_username)
        props.setChildId(res.data[0].child_id)
        axios.get(`/api/child/tasks/${res.data[0].child_id}`)
        .then(newRes => {
          console.log(newRes.data) //I hate this line
          props.setTasks(newRes.data)
        })
        .catch(err => console.log(err))
    });
  }, [props.isChild]);


  function selectChild(child){
    props.setTitle(child.child_username);
    props.s 
    axios.get(`/api/child/tasks/${child.child_id}`)
    .then(newRes => {
      console.log(newRes.data) //I hate this line
      props.setTasks(newRes.data)
    })
    .catch(err => console.log(err))
  }

  const listChildren = children.map((child, i) =>
    <li key={i}>
      <button onClick={() => selectChild(child)}>
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