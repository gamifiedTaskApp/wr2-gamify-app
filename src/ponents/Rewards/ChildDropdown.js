import React, { useState, useEffect } from 'react';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';
import './rewards.css'

function ChildDropdown(props) {

    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    const [children, setChildren] = useState([]);
    // const childName = children[0] ? children[0].child_username : "";
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
    <li className='dd-list-item' key={i}>
      <button className='child-button' onClick={() => {
        setTitle(child.child_username)
        setOpen(false)}}>
        {child.child_username}
      </button>
    </li>
  )
  ChildDropdown.handleClickOutside = () => setOpen(false);

  console.log(children)

  return (
    <div className='dd-wrapper'>
      <div 
        className='dd-header'
        tabIndex={0}
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}>
        <div className='dd-header__title'>
          <p className='dd-header__title--bold'>{title}</p>
        </div>
        <div className='dd-header__action'>
          <p>{open ? <i className='arrow up'></i> : <i className='arrow down'></i>}</p>
        </div>
      </div>
      {open && (
        <ul className='dd-list'>
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