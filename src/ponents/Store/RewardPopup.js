import React from "react";
import Popup from "reactjs-popup";
import './store.css';

function RewardPopup(props) {
  console.log(props);
  return (
    <Popup trigger={<button className='add-reward'> Add Reward</button>} modal closeOnDocumentClick className="popup-reward">
      {(close) => (
        <div className='input-container'>
          <div className='submit-inputs'>
            <label><b>Reward:</b></label>
            <input
              className='submit-reward'
              value={props.reward}
              onChange={(e) => props.setReward(e.target.value)}
            />
        </div>
        <div className='submit-inputs'>
            <label><b>Points:</b></label>
            <input
              className='submit-task-points'
              value={props.rewardPoints}
              type="number"
              onChange={(e) => props.setRewardPoints(e.target.value)}
            />
        </div>
        <div className="popup-buttons">
        <button className="popup-button"
          onClick={() => {
            props.submitReward()
            props.setReward("")
            props.setRewardPoints(0)
            close()
          }}
        >
          Add reward
          </button>
          <button className="popup-button"
            onClick={() => {
              props.setReward("")
              props.setRewardPoints(0)
              close();
            }}
          >
            Cancel
          </button>
        </div>
        </div>
      )}
    </Popup>
  );
}

export default RewardPopup;