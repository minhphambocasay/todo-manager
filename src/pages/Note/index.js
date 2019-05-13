import React, { useEffect } from 'react';
import { connect } from 'dva';

const Note = ({ loading, notes, dispatch }) => {
  // console.log(dispatch)
  useEffect(() => {
    dispatch({
      type: 'noteModel/getNotes',
    });
  }, []);
  console.log('render');
  const notesArr = notes ? notes.map(note => <li>{note.name}</li>) : 'Hello';
  console.log(notes);
  return <div>{loading ? 'Loading' : notesArr}</div>;
};

export default connect(({ noteModel, loading }) => ({
  notes: noteModel.notes,
  loading: loading.models.noteModel,
}))(Note);
