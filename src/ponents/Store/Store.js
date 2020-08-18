import React,{useEffect, useState} from 'react';
import './store.css'
import axios from 'axios';
import {connect} from "react-redux"

const Store= props=>{
    console.log(props)
    const [store, setStore]=useState([])
    const [points, setPoints]=useState(props.userReducer.user.data.points)

    useEffect(()=>{
        console.log('use effect working')
        retrieveStoreRewards()
    },[])

    const retrieveStoreRewards =()=>{
        console.log('retrieve store rewards')
        axios.get(`/api/storeRewards/${props.userReducer.user.data.id}`)
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
        if (props.userReducer.user.data.points >=rewardsPrice){
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
            {console.log(storeReward)}
            {console.log(store)}
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
        <p>Total Points{points}</p>
        {storeRewards}
    </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Store);