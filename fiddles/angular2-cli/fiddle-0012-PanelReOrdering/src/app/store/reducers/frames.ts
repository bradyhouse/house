import {
  ADD_FRAME,
  REMOVE_FRAME,
  TOGGLE_ACTIVE
} from '../actions';

const details = (state, action) => {
  switch(action.type){
    case TOGGLE_ACTIVE:
      if(state.id === action.id){
        return Object.assign({}, state, {isActive: !state.isActive});
      }
      return state;
    default:
      return state;
  }
};

export const frames = (state = [], action) => {
  switch(action.type){
    case ADD_FRAME:
      return [
        ...state,
        Object.assign({}, {id: action.payload.id, name: action.payload.name, guests: 0, attending: false})
      ];

    case REMOVE_FRAME:
      return state
        .filter(frame => frame.id !== action.payload);


    case TOGGLE_ACTIVE:
      return state.map(frame => details(frame, action));
    default:
      return state;
  }
};
