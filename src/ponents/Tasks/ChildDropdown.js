import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import axios from "axios";
import "./tasks.css";

function ChildDropdown(props) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    axios.get(`/api/parents/children/${props.userId}`).then((res) => {
      setChildren(res.data);
      props.setTitle(res.data[0].child_username);
      props.setChildId(res.data[0].child_id);
      let childId = res.data[0].child_id;
      let date = props.selectedDate;

      axios
        .post(`/api/child/tasks`, { childId, date })
        .then((newRes) => {
          console.log(newRes.data); //I hate this line
          props.setTasks(newRes.data);
        })
        .catch((err) => console.log(err));
    });
  }, [props.isChild]);

  function selectChild(child) {
    props.setTitle(child.child_username);
    props.setChildId(child.child_id);
    let childId = child.child_id;
    let date = props.selectedDate;
    console.log(props.selectedDate);
    axios
      .post(`/api/child/tasks`, { childId, date })
      .then((newRes) => {
        console.log(newRes.data); //I hate this line
        props.setTasks(newRes.data);
      })
      .catch((err) => console.log(err));
  }

  const listChildren = children.map((child, i) => ( //set child, not settitle
    <li className="dd-list-item" key={i}>
      <button className="child-button"
        onClick={() => selectChild(child)}> 
        {child.child_username}
      </button>
    </li>
  ));
  ChildDropdown.handleClickOutside = () => setOpen(false);

  return (
    <div className="dd-wrapper">
    {props.isChild ? (
      ""
    ) : (
      <div>
        <div
          className="dd-header"
          tabIndex={0}
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        >
          <div className="dd-header__title">
            <p className="dd-header__title--bold">{props.title}</p>
          </div>
          <div className="dd-header__action">
            <p>{open ? (
              <i className="arrow up"></i>
              ) : (
                <i className="arrow down"></i>
              )}
            </p>
          </div>
        </div>
        {open && <ul className="dd-list">{listChildren}</ul>}
        </div>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => ChildDropdown.handleClickOutside,
};

export default onClickOutside(ChildDropdown, clickOutsideConfig);
