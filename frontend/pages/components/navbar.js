import React, { Component } from 'react'
import { Menu } from 'antd';
import Cookies from 'js-cookie';

import {
  HeatMapOutlined ,
  FireOutlined,
  GiftOutlined,
} from '@ant-design/icons';

import Link from 'next/link';


export default class navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: Cookies.get('url'),
    };

  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
    Cookies.set('url', e.key)
  };
  render(){
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="about" disabled>
          Rap Vocab Counter
        </Menu.Item>
        <Menu.Item key="leaderboard">
          <GiftOutlined />
          <Link href="/charts"><a>Charts</a></Link>
        </Menu.Item>
        <Menu.Item key="tracks">
          <HeatMapOutlined />
          <Link href="/tracks"><a>Tracks</a></Link>
        </Menu.Item>
        <Menu.Item key="artists">
          <FireOutlined />
          <Link href="/artists"><a>Artists</a></Link>
        </Menu.Item>
      </Menu>
    );
  }
}
