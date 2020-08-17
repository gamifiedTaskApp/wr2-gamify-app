import { } from './constraints';

const initialState = {

};

export default function taskReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  };
};