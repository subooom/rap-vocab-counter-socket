import Leaderboard from './charts';
import Cookies from 'js-cookie';
import Navbar from './components/navbar';
import Parallax from 'parallax-js'

class Home extends React.Component {
  componentDidMount(){
    Cookies.set('url', '')
  }
  componentDidMount(){
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
      relativeInput: true,
      friction: .9
    });
  }
  render() {
    return (
        <div style={{background: `url(./wallhaven-717496.jpg)`, height: '100vh', backgroundSize:'cover'}}>
          <Navbar></Navbar>

          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}}>

          </div>
          <div data-relative-input="true" id="scene" style={{position: 'absolute', bottom:'300px', right: 0, left: 0}} >
            <h2 data-depth="0.7" style={{margin:20, color: '#0058c5'}}>SUBHAM KHAREL</h2>
            <h1 data-depth="0.1" style={{margin:20, color: '#0058c5'}}>RAP VOCAB COUNTER</h1>
            <p  data-depth="0.9"  style={{fontWeight: 500, color: '#0058c5', marginBottom: 40, marginTop: 150}}>THIS IS A TOOL TO ADD LYRICS TO A SONG AND SEE THE NUMBER OF UNIQUE WORDS PER ARTISTS.</p>

          </div>
        </div>
    );
  }
}

export default Home
