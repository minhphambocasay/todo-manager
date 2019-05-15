/* eslint-disable prefer-destructuring */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Input, Empty, Icon } from 'antd';
import { connect } from 'dva';
// import NoteItem from '../NoteItem';
// import NoteItem from ./
const Note = ({
  notes,
  dispatch,
  handleOnKeyPress,
  handleCreateNote,
  handleUpdateNote,
  handleDeleteNote,
  handleOnPressEnter,
  showComments,
}) => {
  // console.log(dispatch)
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    dispatch({
      type: 'noteModel/getAllNotes',
    });
  }, []);
  handleCreateNote = data => {
    // eslint-disable-line no-param-reassign
    dispatch({
      type: 'noteModel/createNote',
      payload: data,
    });
  };

  handleOnPressEnter = e => {
    handleCreateNote(e.target.value);
    setInputValue('');
  };

  handleOnKeyPress = e => {
    setInputValue(e.target.value);
  };

  handleDeleteNote = data => {
    dispatch({
      type: 'noteModel/deleteNote',
      payload: data,
    });
  };

  showComments = () => {
    console.log('showComemtn');
  };

  const columns = [
    {
      title: 'Completed',
      dataIndex: null,
      width: 150,
      render: data => {
        return (
          <Checkbox checked={data.is_done} onChange={() => handleUpdateNote(data, 'is_done')} />
        );
      },
    },
    {
      title: 'Content',
      dataIndex: null,
      render: data => {
        return (
          <Input
            className="content"
            onChange={e => {
              let timeout;
              if (timeout) clearTimeout(timeout);
              const value = e.target.value;
              timeout = setTimeout(() => {
                handleUpdateNote(data, 'content', value);
              }, 300);
            }}
            disabled={data.is_done}
            defaultValue={data.content}
          />
        );
      },
    },

    {
      title: 'In Progress',
      dataIndex: null,
      width: 150,
      render: data => {
        return (
          <Checkbox
            checked={data.is_doing}
            disabled={data.is_done}
            onChange={() => handleUpdateNote(data, 'is_doing')}
          />
        );
      },
    },
    {
      title: '',
      dataIndex: null,
      width: 100,
      render: data => {
        return (
          <div className="actionIcons">
            <div onClick={() => showComments(data)} className="infoIcon">
              <Icon type="info" />
            </div>
            <div onClick={() => handleDeleteNote(data)} className="deleteIcon">
              <Icon type="delete" style={{ color: 'red' }} />
            </div>
          </div>
        );
      },
    },
  ];

  handleUpdateNote = (data, index, value) => {
    // eslint-disable-line no-param-reassign
    // eslint-disable-next-line no-prototype-builtins
    const updateObj = {};
    updateObj.id = data.id;
    if (index === 'is_done') {
      if (data && data.hasOwnProperty('is_done')) {
        // eslint-disable-next-line no-param-reassign
        updateObj.is_done = !data.is_done;
      }
    } else if (index === 'is_doing') {
      if (data && data.hasOwnProperty('is_doing')) {
        // eslint-disable-next-line no-param-reassign
        updateObj.is_doing = !data.is_doing;
      }
    } else if (index === 'content') {
      updateObj.content = value;
    }
    dispatch({
      type: 'noteModel/updateNote',
      payload: updateObj,
    });
  };

  return (
    <div className="note">
      <div className="noteInput">
        <Input
          onChange={handleOnKeyPress}
          onPressEnter={handleOnPressEnter}
          value={inputValue}
          placeholder="What needs to be done?"
        />
      </div>
      {notes && notes.length ? <Table columns={columns} dataSource={notes} /> : <Empty />}
      <div />
    </div>
  );
};

export default connect(({ noteModel, loading }) => {
  return {
    notes: noteModel.notes,
    loading: loading.models.noteModel,
  };
})(Note);
