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
      <Form></Form>
      <div>subham kharel</div>
        <Form></Form>

      </Carousel>
    </div>
  )
}
