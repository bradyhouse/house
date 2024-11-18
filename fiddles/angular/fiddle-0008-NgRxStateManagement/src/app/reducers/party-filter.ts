import {
  SHOW_ATTENDING,
  SHOW_ALL,
  SHOW_WITH_GUESTS
} from '../actions';

//return appropriate function depending on selected filter
export const partyFilter = (state = person => person, action) => {
  switch(action.type){
    case SHOW_ATTENDING:
      return person => person.attending;
    case SHOW_ALL:
      return person => person;
    case SHOW_WITH_GUESTS:
      return person => person.guests;
    default:
      return state;
  }
};
