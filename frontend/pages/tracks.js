import React from 'react'
import Navbar from './components/navbar';
import Form from './components/addvocabform';
import { Carousel } from 'antd';

function onChange(a, b, c) {
  console.log(a, b, c);
}
export default function Tracks() {

  return (
    <div>
      <Navbar></Navbar>

      <Carousel afterChange={onChange}>
      <div>

        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
          <h2 style={{fontSize: 80, margin: '40px 0 0 0', color:'#0058c5' }}>TRACKS</h2>
          <p style={{lineHeight: 0, fontWeight: 500, color: '#0058c5', marginBottom: 40}}>ADD TRACKS TO AN ARTISTS' VOCAB</p>

        </div>
          <Form></Form>
      </div>
      </Carousel>
    </div>
  )
}
