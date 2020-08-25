import React from "react";
import Popup from "reactjs-popup";
import './store.css';

function RewardPopup(props) {
  console.log(props);
  return (
    <Popup trigger={<button> Add Reward</button>} modal closeOnDocumentClick className="popup-reward">
      {(close) => (
        <div className='input-container'>
          <div className='submit-inputs'>
            <label><b>Reward</b></label>
            <input
              className='submit-reward'
              value={props.reward}
              onChange={(e) => props.setReward(e.target.value)}
            />
        </div>
        <div className='submit-inputs'>
            <label><b>Points</b></label>
            <input
              className='submit-task-points'
              value={props.rewardPoints}
              type="number"
              onChange={(e) => props.setRewardPoints(e.target.value)}
            />
        </div>
        <button 
          onClick={() => {
            props.submitReward()
            close()
          }}
        >
          Add reward
          </button>
          <button
            onClick={() => {
              close();
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </Popup>
  );
}

export default RewardPopup;