import React,{useEffect, useState} from 'react';
import './store.css'
import axios from 'axios';
import {connect} from "react-redux"
import userReducer from '../../redux/userReducer';

const Store= props=>{
    console.log(props)
    const [store, setStore]=useState([])

    //will invoke retrieveStoreReward on load. might need to add store to []
    useEffect(()=>{
        console.log('use effect working')
        retrieveStoreRewards()
    },[])

    //will return array of reward objects and set it to local state. need to add userReducer to .get
    const retrieveStoreRewards =()=>{
        console.log('retrieve store rewards')
        axios.get(`/api/storeRewards/18`)
        .then((res)=>{
            console.log('retrieve store rewards working')
            console.log(res)
            setStore(res.data)
        })
    }

    //check if user has enough points to buy. if so sends request. else alert. need console.log to see what I'm pulling
    const buyItem = (rewardButton)=>{
        console.log(rewardButton)
        let childId = rewardButton[0]
        let rewardsPrice = rewardButton[1]
        let rewardId = rewardButton[2]
        if (props.userReducer.user.points >=rewardsPrice){
            axios.put('/api/buyItem',{childId, rewardsPrice, rewardId})
            .then((res)=>{
                console.log('working')
            })
        }else{
            alert("not enough points")
        }
    }

    const storeRewards= store.map((storeReward, i)=>(
        <div className="storeReward" key={i}>
            {console.log(storeReward)}
            {storeReward.name}
            {storeReward.rewards_price}
            <button value={[storeReward.kid_id,storeReward.rewards_price, storeReward.reward_id]}
                onClick={e=>buyItem(e.target.value)}>
                Buy
            </button>
        </div>
    ))
    return(
    <div>
        <p>Total Points{}</p>
        {storeRewards}
    </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Store);