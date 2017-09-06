import {
  SHOW_ACTIVE
} from '../actions';

export const activeFilter = (state = frame => frame, action) => {
  switch(action.type){
    case SHOW_ACTIVE:
      return frame => frame.isActive;
    default:
      return state;
  }
};
