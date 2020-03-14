import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Typography, TreeSelect  } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { slugger } from './../utils/slugger';
import io from "socket.io-client";
import { connect } from 'react-redux';
import { fetchArtists } from './../actions/artistsAction'
import artistReducer from '../reducers/artistReducer';


const { Title } = Typography;

const { TreeNode } = TreeSelect;

function onChange(value) {
  console.log('Change:', value);
}

function onSelect(option) {
  console.log('select', option);
}

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const AddVocabularyForm = (props) => {
  const [lyrics, setLyrics] = useState(0);
  const [name, setName] = useState(0);
  const [song_name, setSongName] = useState(0);
  const [form] = Form.useForm();
  const [checkNick, setCheckNick] = useState(false);
  useEffect(() => {
    form.validateFields(['nickname']);

  }, [checkNick]);

  const onClick = async (e) => {
    e.preventDefault();

    const socket = io.connect('http://localhost:4500/');

    const songDetail = {
      name: name,
      song_name: song_name,
      lyrics: lyrics,
      slug: slugger(song_name)
    }

    socket.emit('add vocab', songDetail)

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
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          value={name}
          onChange= {e=> setName(e)}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onClick={_=>props['artists'] ? '' : props.fetchArtists()}
        >
          <TreeNode value="Artists" title="Artists" disabled>
          {
            props['artists'] ?
            props['artists']['msg'].map(artist => (
              <>
                <TreeNode value={artist['slug']} title={artist['name']} />
              </>
            )) : ''
          }
          </TreeNode>
        </TreeSelect>
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="song_name"
        label="Name of the song"
        rules={[
          {
            required: true,
            message: 'Please input the name of the song',
          },
        ]}
      >
        <Input id="song_name" onChange={(e) => setSongName(e.target.value)} value={song_name} placeholder="Please input the name of the song" />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        name="lyrics"
        label="Song Lyrics"
        rules={[
          {
            required: true,
            message: 'Please input the lyrics of the song',
          },
        ]}
      >
        <TextArea id="lyrics" onChange={(e) => setLyrics(e.target.value)}  rows={13}>{lyrics}</TextArea>
      </Form.Item>
      <Form.Item
        {...formItemLayout}
      >
        <Button type="primary"   style={{marginLeft:250}} onClick={onClick}>
          Add Vocabulary
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = state => ({
  artists: state.artists.items
})

export default connect(mapStateToProps, { fetchArtists })(AddVocabularyForm);