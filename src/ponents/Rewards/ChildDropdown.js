import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import axios from "axios";
import "./rewards.css";

function ChildDropdown(props) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [children, setChildren] = useState([]);
  // const childName = children[0] ? children[0].child_username : "";
  const [title, setTitle] = useState("");

  function getRewards(child) {
    axios
      .get(`/api/earnedRewards/${child.child_id}`)
      .then((res) => {
        setTitle(child.child_name);
        props.setChild(child);
        setOpen(false);
        props.setRewards(res.data);
      })
      .catch((err) => alert(err));
  }

  useEffect(() => {
    if (!props.isChild) {
      axios.get(`/api/parents/children/${props.userId}`).then((res) => {
        setChildren(res.data);
        setTitle(res.data[0] ? res.data[0].child_name : "");
        props.setChild(res.data[0]);
        if (res.data[0]) {
          axios
            .get(`/api/earnedRewards/${res.data[0].child_id}`)
            .then((newRes) => {
              console.log(newRes.data); //I hate this line
              props.setRewards(newRes.data);
            });
        }

      });
    } else {
      console.log('hit')
      axios.get(`/api/earnedRewards/${props.userId}`).then((res) => {
        props.setRewards(res.data);
      });
    }
  }, [props.isChild, props.count]);

  const listChildren = children.map((child, i) => {
    if (child.child_name !== title) {
      return (
        <li className="reward-dd-list" key={i}>
          <button
            className="child-button"
            onClick={() => {
              getRewards(child);
            }}
          >
            {child.child_name}
          </button>
        </li>
      );
    }
  });
  ChildDropdown.handleClickOutside = () => setOpen(false);

  return (
    <div className="dd-wrapper-dropdown">
      {props.isChild ? (
        ""
      ) : (
          <div className='dd-header-dropdown'>
            <div
              className="dd-header-dropdown"
              tabIndex={0}
              onKeyPress={() => toggle(!open)}
              onClick={() => toggle(!open)}
            >
              <div className="dd-header__title">
                <p className="dd-header__title--bold">{title}</p>
              </div>
              <div className="dd-header__action">
                <p>
                  {open ? (
                    <i className="arrow up"></i>
                  ) : (
                      <i className="arrow down"></i>
                    )}
                </p>
              </div>
            </div>
            {open && <ul className="reward-dd-list">{listChildren}</ul>}
          </div>
        )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => ChildDropdown.handleClickOutside,
};

export default onClickOutside(ChildDropdown, clickOutsideConfig);
