import React from 'react';
import './parent.css';
function Parent(props){
    return(
    <div className="cont">
        <div className="child_container">
            <span>Add Child Account</span>
            <button>+</button>
        </div>
    </div>
    )
}
export default Parent;