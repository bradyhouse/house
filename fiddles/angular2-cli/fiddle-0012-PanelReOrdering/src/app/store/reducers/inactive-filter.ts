import {
  SHOW_INACTIVE
} from '../actions';

export const inactiveFilter = (state = frame => frame, action) => {
  switch(action.type){
    case SHOW_INACTIVE:
      return frame => !frame.isActive;
    default:
      return state;
  }
};
