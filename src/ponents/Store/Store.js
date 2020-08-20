import React,{useEffect, useState} from 'react';
import './store.css'
import axios from 'axios';
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";
import ChildDropdown from './ChildDropdown';

const Store= props=>{
    console.log(props)
    const [store, setStore]=useState([])
    const isChild = props.user ? props.user.isChild ? true : false : "";
    const [child, setChild] = useState({});
    const [points, setPoints]=useState(props.userReducer.user.data ? props.userReducer.user.data.points : "")

    console.log(store, child,points)

    useEffect(()=>{
        console.log('use effect working')
        retrieveStoreRewards()
    },[])

    const retrieveStoreRewards =()=>{
        console.log('retrieve store rewards')
        let userId = props.userReducer.user.data ? props.userReducer.user.data.id : "";
        console.log(userId)
        axios.get(`/api/storeRewards/${userId}`)
        .then((res)=>{
            console.log('retrieve store rewards working')
            console.log(res)
            setStore(res.data)
            console.log(store)
        })
    }

    const buyItem = (rewardButton)=>{
        rewardButton = rewardButton.split(',')
        let childId = rewardButton[0]
        let rewardsPrice = rewardButton[1]
        let rewardId = rewardButton[2]
        if (points >=rewardsPrice){
            axios.put('/api/buyItem',{childId, rewardsPrice, rewardId})
            .then((res)=>{
                console.log('working')
                setPoints(points-rewardsPrice)
                setStore(res.data)
            })
        }else{
            alert("not enough points")
        }
    }

    const storeRewards= store.map((storeReward, i)=>(
        <div className="storeReward" key={i}>
            {/* {console.log(storeReward)} */}
            {/* {console.log(store)} */}
            <div className="rewardInfo">
            <div className='rewardName'>
                {storeReward.name}
            </div>
            <div className='rewardPrice'>
                {storeReward.rewards_price}
            </div>
            </div>
            <button className="buyButton" value={[storeReward.kid_id,storeReward.rewards_price, storeReward.reward_id]}
                onClick={e=>buyItem(e.target.value)}>
                Buy!
            </button>
        </div>

        

    ))
    return(
    <div className='storepage'>
        {props.userReducer.loggedIn? 
        props.userReducer.user.data.parental?
        <ChildDropdown isChild={isChild} userId={props.userReducer.user.data ? props.userReducer.user.data.id : ""} setChild={setChild} setStore={setStore} setPoints={setPoints} />
        :null
        :<Redirect to={'/login'} />
        }
        <div className='points'>
            <div className = 'textPoints'>
            Total Points: {points}</div>
         </div>
        <div className='storeRewards'>
        {storeRewards}
        </div>
    </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Store);