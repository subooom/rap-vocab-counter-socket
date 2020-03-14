import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { slugger } from './../utils/slugger';
import io from "socket.io-client";



const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const AddArtistForm = () => {

  const [name, setName] = useState(0);

  const [form] = Form.useForm();

  const [checkNick, setCheckNick] = useState(false);

  useEffect(() => {
    form.validateFields(['nickname']);
    // socket.on('new artist', function(data) {
    //   // make redux call
    // })

  }, [checkNick]);

  const onClick = async (e) => {
    e.preventDefault();

    const socket = io.connect('http://localhost:4500/');

    const artist = {
      name: name,
      slug: slugger(name)
    }

    socket.emit('add artist', artist)

  };
  return (
    <Form form={form} name="dynamic_rule" style={{marginTop:100}}>

      <Form.Item
        {...formItemLayout}
        name="artist"
        label="Name of the artist"
        rules={[
          {
            required: true,
            message: 'Please input the name of the artist',
          },
        ]}
      >
        <Input id="artist_name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Please input the name of the artist" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
      >
        <Button type="primary"   style={{marginLeft:250}} onClick={onClick}>
          Add Artist
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddArtistForm;