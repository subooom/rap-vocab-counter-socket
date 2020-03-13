import { FETCH_ARTISTS, NEW_ARTIST } from './../actions/types';

const initialState = {
  artists: [],
  artist: {}
}

export default function( state = initialState, action){
  switch(action.type){
    case FETCH_ARTISTS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;

  }

}