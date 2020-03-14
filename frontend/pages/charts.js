import React, { useEffect } from 'react'
import Navbar from './components/navbar';
import { connect } from 'react-redux';
import { fetchTopTen } from './actions/topTenAction'

const Leaderboard = (props) => {
  useEffect(() => {
    props.topTen === undefined ? props.fetchTopTen() : '';
  }, [props]);
  return (
    <div>
      <Navbar></Navbar>

      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%', height:'auto'}}>
        <h2 style={{fontSize: 80, margin: '40px 0 0 0', color:'#0058c5' }}>CHARTS</h2>
        <p style={{lineHeight: 0, fontWeight: 500, color: '#0058c5', marginBottom: 40}}>MAXIMUM NUMBER OF WORDS PER ARTIST</p>

        <div className="top-ten-list" style={{width:'100%', padding: 20, display:'flex', flexDirection: 'column',}}>
          {
            props['topTen'] ? props['topTen'].length != 0 ? props['topTen'].map((artist, index)=>(
              <div className="top-ten-list-item"  style={{display:'grid', gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr", alignItems:'center', justifyContent:'center', borderBottom: '1px solid #f1f1f1', paddingTop: 20, paddingBottom: 20}}>
                <div><h3 style={{textAlign:'center'}}>{index+1}</h3></div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <img src="https://picsum.photos/50/50"></img>
                  <p style={{marginLeft:50, fontSize: '20px', marginBottom: 0, fontWeight: 700}}>{artist['name']}</p>
                </div>
                <div>
                  <h3>{artist['words']}</h3>
                </div>
                <div>
                  {artist['songs_on_site']} songs on site.
                </div>
              </div>
            )) :
      <div class="sp sp-3balls" style={{alignSelf:'center'}}></div> : ''
          }

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  topTen: state.topTen.items
})

export default connect(mapStateToProps, { fetchTopTen })(Leaderboard);