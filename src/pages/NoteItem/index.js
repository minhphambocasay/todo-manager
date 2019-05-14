/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'dva';

const NoteItem = ({ handleDeleteNote, dispatch, handleUpdateNote, item }) => {
  // eslint-disable-next-line no-param-reassign
  handleDeleteNote = data => {
    dispatch({
      type: 'noteModel/DELETE_NOTE',
      payload: data,
    });
  };

  handleUpdateNote = (data, index) => {
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
    }
    dispatch({
      type: 'noteModel/UPDATE_NOTE',
      payload: updateObj,
    });
  };
  // const [item, setItem] = useState(item); // eslint-disable-line no-param-reassign
  // useEffect(() => {
  //   console.log(updatedNote, item)
  //   if (updatedNote && item && (updatedNote.id === item.id)) {
  //     setItem(updatedNote)
  //   }
  // }, [item])

  return (
    <div key={item.id} className={`${item.is_done ? 'strikethrough' : ''} noteItem`}>
      <input
        type="checkbox"
        checked={item.is_done}
        onChange={() => handleUpdateNote(item, 'is_done')}
      />
      <div className="content">{item.content}</div>
      {/* <div onClick={() => handleUpdateNote(item)}>edit</div> */}
      <div onClick={() => handleDeleteNote(item)}>delete</div>
      <input
        type="checkbox"
        checked={item.is_doing}
        onChange={() => handleUpdateNote(item, 'is_doing')}
      />
    </div>
  );
};

export default connect(models => {
  console.log(models);
  // if (models.noteModel.udpatedNote && models.noteModel.udpatedNote.id === ite) {
  // return { item: models.noteModel.udpatedNote }
  // }
  return {};
})(NoteItem);
