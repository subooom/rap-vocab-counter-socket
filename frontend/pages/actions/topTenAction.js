import { FETCH_TOP_TEN } from './../actions/types';
import io from "socket.io-client";
import unique from 'unique-words';

export function fetchTopTen(){
  return function(dispatch){
    const socket = io.connect('http://localhost:4500/');
    const updatedArtists = [];
    const topTen = [];


    socket.emit('find artists', null)
    socket.on('artists found', artists => {
      artists['msg'].forEach((artist, index) => {
        let total_lyrics = "";
        socket.emit('find vocabs', artist)
        socket.on('vocabs found', vocabs => {
          vocabs['msg'].forEach(vocab =>{
            total_lyrics += vocab['lyrics'];
            artist['words'] = unique(total_lyrics).length
          })

          artist.words ? '' : artist.words = 0;
          updatedArtists.push(artist);
          if(artists['msg'].length-1 == index){
            updatedArtists.sort((a, b) => b.words - a.words)
            updatedArtists.forEach((artist, i) => i<=9 && topTen.length<10 ? topTen.push(artist) : null)
            console.log(topTen)
          }
        })
      });


      return dispatch({
        type: FETCH_TOP_TEN,
        payload: topTen
      })
    })

  }
}