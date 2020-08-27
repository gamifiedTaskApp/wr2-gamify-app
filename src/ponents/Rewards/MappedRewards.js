import React from "react";
import Axios from 'axios';

function mappedRewards(props) {

  let rewardId = props.reward.reward_id;
  let childId = props.reward.kid_id;

  function deleteReward() {
    console.log(rewardId)
    Axios.delete(`/api/delete/reward/${rewardId}`)
  }

  return (
    <div className='rewards-div'>
      <div className='reward-holder'>
        <h5 className='reward-text'>You have earned:</h5>
        <br />
        <h5 className='reward-text'><b>{props.reward.name}</b></h5>
      </div>

      <div className='rewards-button'>
        <button className='reward-remove-button'
          onClick={() => {
            deleteReward()
            props.setCount(props.count + 1)
          }
          }>Claim Reward</button>
      </div>

    </div>
  )
}

export default mappedRewards;
