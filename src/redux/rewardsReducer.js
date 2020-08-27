import { } from './constraints';

const initialState = {
  rewards: []
};

export default function rewardsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}