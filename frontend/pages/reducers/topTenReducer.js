import { FETCH_TOP_TEN } from './../actions/types';

const initialState = {
  topTen: []
}

export default function( state = initialState, action){
  switch(action.type){
    case FETCH_TOP_TEN:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;

  }

}