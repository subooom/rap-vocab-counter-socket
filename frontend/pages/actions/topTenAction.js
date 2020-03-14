import { FETCH_TOP_TEN } from './../actions/types';
import io from "socket.io-client";
import unique from 'unique-words';

export function  fetchTopTen(){
  return async function(dispatch){
    const socket = io.connect('http://localhost:4500/');
    const updatedArtists = [];
    const topTen = [];

    socket.emit('find artists', null)
    socket.emit('find vocabs', null)
    await socket.on('artists found', artists => {
      artists['msg'].forEach((artist, index) => {
        let total_lyrics = "";
        let songs_on_site = 0;
        socket.on('vocabs found', vocabs => {
          vocabs['msg'].forEach( vocab =>{
            if(vocab.name == artist.slug){
              songs_on_site++;
              total_lyrics += vocab['lyrics'];
              artist['words'] = unique(total_lyrics).length
              artist['songs_on_site'] = songs_on_site
            }
          })

          artist.words ? '' : artist.words = 0;
          artist.songs_on_site ? '' : artist.songs_on_site = 0;
          updatedArtists.push(artist);
          if(artists['msg'].length-1 == index){
            updatedArtists.sort((a, b) => b.words - a.words)
            updatedArtists.forEach((artist, i) => i<=9 && topTen.length<10 ? topTen.push(artist) : null)
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