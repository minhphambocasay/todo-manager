/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import React, { useCallback } from 'react';
import { connect } from 'dva';

const NoteItem = ({ handleDeleteNote, dispatch, handleUpdateNote, item }) => {
  // eslint-disable-next-line no-param-reassign
  handleDeleteNote = useCallback(data => {
    dispatch({
      type: 'noteModel/deleteNote',
      payload: data,
    });
  }, []);

  handleUpdateNote = useCallback((data, index, e) => {
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
      updateObj.content = e.target.value;
    }
    dispatch({
      type: 'noteModel/updateNote',
      payload: updateObj,
    });
  }, []);

  return (
    <div key={item.id} className={`${item.is_done ? 'strikethrough' : ''} noteItem`}>
      <input
        type="checkbox"
        checked={item.is_done}
        onChange={() => handleUpdateNote(item, 'is_done')}
      />
      <input
        className="content"
        onChange={e => handleUpdateNote(item, 'content', e)}
        disabled={item.is_done}
        value={item.content}
      />
      {/* <div onClick={() => handleUpdateNote(item)}>edit</div> */}
      <div onClick={() => handleDeleteNote(item)}>delete</div>
      <input
        type="checkbox"
        checked={item.is_doing}
        disabled={item.is_done}
        onChange={() => handleUpdateNote(item, 'is_doing')}
      />
    </div>
  );
};

export default connect(() => {})(NoteItem);
