import Leaderboard from './charts';
import Cookies from 'js-cookie';

class Home extends React.Component {
  componentDidMount(){
    Cookies.set('url', 'leaderboard')
  }
  render() {
    return (
        <Leaderboard></Leaderboard>
    );
  }
}

export default Home
