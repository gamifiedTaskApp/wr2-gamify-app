import React from 'react';
import './store.css'
import axios from 'axios';
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
        axios.get(`/api/storeRewards/${id}`)
        .then((res)=>{
            console.log('retrieve store rewards working')
            console.log(res)
            setStore(res.data)
        })
    }

    //check if user has enough points to buy. if so sends request. else alert
    const buyItem = (e)=>{
        console.log(e)
        // if (userReducer.points >=){
        //     axios.put

        // }else{
        //     alert("not enough points")
        // }
    }

    const storeRewards= store.map((storeReward, i)=>(
        <div className="storeReward" key={i}>
            {storeReward.name}
            {storeReward.price}
            <button onClick={e=>buyItem(e)}>Buy</button>
        </div>
    ))
    return(
    <div>
        {storeRewards}
    </div>
    )
}
export default Store;