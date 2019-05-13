/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import NoteItem from '../NoteItem';
// import NoteItem from ./
const Note = ({ notes, dispatch, handleOnKeyPress, handleCreateNote }) => {
  // console.log(dispatch)
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    dispatch({
      type: 'noteModel/GET_ALL_NOTES',
    });
  }, []);
  handleCreateNote = data => {
    // eslint-disable-line no-param-reassign
    dispatch({
      type: 'noteModel/CREATE_NOTE',
      payload: data,
    });
  };

  handleOnKeyPress = e => {
    // eslint-disable-line no-param-reassign
    if (e.key === 'Enter') {
      handleCreateNote(inputValue);
      setInputValue('');
    } else {
      setInputValue(inputValue + e.key);
    }
  };

  return (
    <div className="note">
      <div className="noteInput">
        <input onKeyPress={handleOnKeyPress} value={inputValue} />
        <div onClick={() => handleCreateNote}>Add note</div>
      </div>
      {notes && notes.length ? (
        <div className="noteItems">
          {notes.map(item => {
            return <NoteItem item={item} />;
          })}
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-indent
        <div className="noNote">Please add some notes</div>
      )}
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
