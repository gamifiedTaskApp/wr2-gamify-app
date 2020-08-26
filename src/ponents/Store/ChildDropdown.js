import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import axios from "axios";
import "./store.css";

function ChildDropdown(props) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [children, setChildren] = useState([]);
  // const childName = children[0] ? children[0].child_username : "";
  const [title, setTitle] = useState("");

  function getRewards(child) {
    axios
      .get(`/api/storeRewards/${child.child_id}`)
      .then((res) => {
        setTitle(child.child_name);
        props.setChild(child);
        setOpen(false);
        props.setStore(res.data);
        axios.get(`/api/getPoints/${child.child_id}`).then((res) => {
          console.log(res);
          props.setPoints(res.data[0].points);
        });
      })
      .catch((err) => alert(err));
  }

  useEffect(() => {
    if (!props.isChild) {
      console.log(props);
      axios.get(`/api/parents/children/${props.userId}`).then((res) => {
        setChildren(res.data);
        setTitle(res.data[0] ? res.data[0].child_name : "");
        props.setChild(res.data[0]);
        props.setPoints(res.data[0] ? res.data[0].points : "");
        console.log(res.data);
        if(res.data[0]){
          axios
          .get(`/api/storeRewards/${res.data[0].child_id}`)
          .then((newRes) => {
            console.log(newRes.data); //I hate this line
            props.setStore(newRes.data);
          });
        }
        
      });
    } else {
      axios.get(`/api/storeRewards/${props.userId}`).then((res) => {
        props.setStore(res.data);
      });
    }
  }, [props.isChild]);

  const listChildren = children.map((child, i) => {
    if (child.child_name !== title) {
      return (
        <li className="dd-list-item" key={i}>
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
