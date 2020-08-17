import React from 'react';
import './store.css'
import axios from 'axios';
const Store= props=>{
    console.log(props)
    const [store, setStore]=useState({})

    useEffect(()=>{
        console.log('use effect working')
        retrieveStoreRewards()
    },[])

    const retrieveStoreRewards =()=>{
        axios.get('/api/storeRewards')
        .then((res)=>{
            console.log('retrieve store rewards working')
            console.log(res)
            setStore(res.data)
        })
    }

    const storeRewards= store.map((storeReward, i)=>(
        
    ))
    return(
    <div>

    </div>
    )
}
export default Store;