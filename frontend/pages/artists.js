import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar';
import Form from './components/addArtistForm';
import { Carousel } from 'antd';
import io from "socket.io-client";
import { connect } from 'react-redux';
import { fetchArtists } from './actions/artistsAction'

function onChange(a, b, c) {
  console.log(a, b, c);
}
const Artists = (props) => {

  const {artists, setArtists} = useState();

  useEffect(() => {
    props.fetchArtists();

    const socket = io.connect('http://localhost:4500/');
    socket.on('new artist', _ => {
      props.fetchArtists();
    })
  }, []);
  return (
    <div>
      <Navbar></Navbar>

      <Carousel afterChange={onChange}>
        <div>

          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
            <h2 style={{fontSize: 80, margin: '40px 0 0 0', color:'#0058c5' }}>ARTISTS</h2>
            <p style={{lineHeight: 0, fontWeight: 500, color: '#0058c5', marginBottom: 40}}>ADD ARTISTS</p>

          </div>
            <Form></Form>
        </div>
      </Carousel>
      <div className="registered-artists">
        <div style={{    display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', width: '100%', alignItems: 'center', justifyContent: 'center'}} className="artist">
          <h3>Registered Artists</h3>
          {
            props['artists'] ?
            props['artists']['msg'].map(artist=>(
              <div class="artist">{artist['name']}</div>
            ))
            : 'No artists yet.'
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  artists: state.artists.items
})

export default connect(mapStateToProps, { fetchArtists })(Artists);