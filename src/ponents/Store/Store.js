import React, { useEffect, useState } from "react";
import {useSpring, animated} from 'react-spring';
// import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import "./store.css";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ChildDropdown from "./ChildDropdown";
import RewardPopup from './RewardPopup';

const Store = (props) => {
  const [store, setStore] = useState([]);
  const isChild = props.user ? (props.user.isChild ? true : false) : "";
  const [child, setChild] = useState({});
  const [points, setPoints] = useState(
    props.userReducer.user.data ? props.userReducer.user.data.points : ""
  );
  const [reward, setReward] = useState("");
  const [rewardPoints, setRewardPoints] = useState(0);
  const fade = useSpring({from:{opacity:0, marginLeft:-1000},to:{opacity:1, margin:'3vh'} });
  const fadePoints = useSpring({from:{opacity:0, marginLeft:-1000},to:{opacity:1, marginRight:'5%'} });
  // const fade = useSpring({opacity: store? 1:0})

  // onDragEnd=(result)=>{
  //   const {destination, source, reason}=result;
  // }

  // console.log(store, child, points);

  useEffect(() => {
    // console.log("use effect working");
    //retrieveStoreRewards(); This line caused an error, dont use it
  }, []);

  const submitReward = () => {
    // console.log("submit reward");
    let childId = child.child_id;
    let parentId = child.u_id;
    // console.log(typeof parseInt(rewardPoints));
    // console.log(reward.length);
    if (reward.length > 0) {
      axios
        .post(`/api/add/reward/one`, {
          childId,
          reward,
          rewardPoints,
          parentId,
        })
        .then((res) => {
          setStore(res.data);
          console.log("submit return working");
        });
    } else {
      alert("Invalid submission");
    }
  };

  const retrieveStoreRewards = () => {
    // console.log("retrieve store rewards");
    let userId = props.userReducer.user.data
      ? props.userReducer.user.data.id
      : "";
    console.log(userId);
    axios.get(`/api/storeRewards/${userId}`).then((res) => {
      // console.log("retrieve store rewards working");
      // console.log(res);
      setStore(res.data);
      // console.log(store);
    });
  };

  const buyItem = (rewardButton) => {
    rewardButton = rewardButton.split(",");
    let childId = rewardButton[0];
    let rewardsPrice = rewardButton[1];
    let rewardId = rewardButton[2];
    if (points >= rewardsPrice) {
      axios
        .put("/api/buyItem", { childId, rewardsPrice, rewardId })
        .then((res) => {
          console.log("working");
          setPoints(points - rewardsPrice);
          setStore(res.data);
        });
    } else {
      alert("not enough points");
    }
  };

    const deleteItem = (deleteButton)=>{
        deleteButton = deleteButton.split(',')
        console.log(deleteButton)
        let childId = deleteButton[0]
        let rewardId = deleteButton[1]
        axios.delete(`/api/remove/reward/${rewardId}`)
        .then((res)=>{
            axios.get(`/api/storeRewards/${childId}`)
            .then((res)=>{
                setStore(res.data)
            })
        })
    }


    const storeRewards= store.map((storeReward, i)=>(
      // <Draggable draggableId={storeReward.reward_id} index={i}>
      //   {(provided, snapshot) => (
        <animated.div className="store-reward" key={i} style={fade}>
            {/* delete reward */}
            {props.userReducer.user.data.parental?
                <button className="delete-button" value={[storeReward.kid_id, storeReward.reward_id]}
                onClick={e=>deleteItem(e.target.value)}>
            </button> :null}
            {console.log(storeReward)}
            {/* {console.log(provided)} */}
            {/* {console.log(snapshot)} */}
            {/* {console.log(store)} */}
            <div className="reward-info">
            <div className='reward-name'>
                {storeReward.name}
            </div>
            <div className='reward-price'>
                {storeReward.rewards_price}
            </div>

            </div>

            <button className="buy-button" value={[storeReward.kid_id,storeReward.rewards_price, storeReward.reward_id]}
                onClick={e=>buyItem(e.target.value)}>
                Buy!
            </button>
        </animated.div>  
        // )} 
        // </Draggable> 
    ))


  return(
  // <DragDropContext onDragEnd={onDragEnd}>
    <div className='store-page'>
        {props.userReducer.loggedIn? 
        props.userReducer.user.data.parental?
        <div className='parent-selection'>
        <ChildDropdown 
            isChild={isChild} 
            userId={props.userReducer.user.data ?
            props.userReducer.user.data.id : ""} 
            setChild={setChild} setStore={setStore} setPoints={setPoints} />
        <RewardPopup
            reward={reward}
            setReward={setReward}
            rewardPoints={rewardPoints}
            setRewardPoints={setRewardPoints}
            submitReward={submitReward}/>
        {/* <div className='submit-inputs'>
            <label><b>Reward</b></label>
            <input
              className='submit-reward'
              value={reward}
              onChange={(e) => setReward(e.target.value)}
            />
        </div>
        <div className='submit-inputs'>
            <label><b>Points</b></label>
            <input
              className='submit-task-points'
              value={rewardPoints}
              type="number"
              onChange={(e) => setRewardPoints(e.target.value)}
            />
        </div>
        <button onClick={submitReward}>Add reward</button> */}
         </div>
        :null
        :<Redirect to={'/login'} />
        }
        <div className='points'>
            <animated.div className = 'text-points' style={fadePoints}>
            Total Points: {points}</animated.div>
         </div>
         {/* <Droppable droppableId={}> */}
        <div className='store-rewards'>
        {storeRewards}
        </div>
        {/* </Droppable> */}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Store);
