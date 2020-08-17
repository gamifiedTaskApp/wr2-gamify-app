import React, {useState} from 'react';
import Axios from "axios"
import './parent.css';
import {connect} from "react-redux";
function Parent(props){
    const parentId = props.userReducer.user.data ? props.userReducer.user.data.id : "";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName]=useState('');
    const [view, setView] = useState(false);
function Switch(){
    if(view===false){
        setView(true)
        console.log(view)
    }
    else{
        setView(false)
    }
}
function createChild(){
    console.log("creating")
    Axios.post('/auth/register/child', {username, password, parentId})
    .then(res => {
        alert("child made")
        Switch();
        setUsername("");
        setPassword("");
        setName("");
    })
    .catch(err => alert(err));
}





    
    return(
    view===false?
    <div>
    <header>nav</header>
    <div className="cont">
        <div className="child_container">
            <span>Add Child Account</span>
            <button onClick={Switch}>+</button>
        </div>
    </div>
    </div>:
    <div>
    <header>nav</header>
    <div className="cont">
        <div className="child_container">
        <span className="input">Name<br></br><input value={name} onChange={e => setName(e.target.value) }></input></span>
        <span className="input">Username<br></br><input value={username} onChange={e => setUsername(e.target.value) }></input></span>
        <span className="input">Password<br></br><input type="password" value={password} onChange={e => setPassword(e.target.value) }></input></span>
          <button className='button' onClick={createChild}>Submit</button>
        </div>
    </div>
    </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Parent);