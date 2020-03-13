import { FETCH_ARTISTS, NEW_ARTIST } from './../actions/types';
import io from "socket.io-client";

export function fetchArtists(){
  return function(dispatch){
    const socket = io.connect('http://localhost:4500/');
    socket.emit('find artists', null)
    socket.on('artists found', artists => dispatch({
      type: FETCH_ARTISTS,
      payload: artists
    }))

  }
}