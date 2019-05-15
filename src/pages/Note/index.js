/* eslint-disable prefer-destructuring */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState, useCallback } from 'react';
import { Table, Checkbox, Input, Empty, Icon, Button, Modal, Row, Col, Spin, Slider } from 'antd';
import { connect } from 'dva';
import { ToastContainer, toast } from 'react-toastify';
import CommentList from '@/components/CommentList';
import SearchBox from '@/components/SearchBox';
import styles from './index.less';
import { getCurrentUsers } from '../../socket';
import 'react-toastify/dist/ReactToastify.css';

const Note = ({ notes, dispatch, loadingPostComment, user }) => {
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [prevLoadingPostComment, setPrevLoadingPostComment] = useState(false);

  const onPostComment = useCallback(() => {
    dispatch({
      type: 'taskListDraftModel/postComment',
      payload: {
        comment: commentText,
        user,
      },
    });
  }, [commentText]);

  if (prevLoadingPostComment !== loadingPostComment) {
    setPrevLoadingPostComment(loadingPostComment);
    if (!loadingPostComment) {
      setCommentText('');
    }
  }

  useEffect(() => {
    getCurrentUsers();
    dispatch({
      type: 'noteModel/getAllNotes',
    });
  }, []);

  const handleCreateNote = useCallback(data => {
    // eslint-disable-line no-param-reassign
    dispatch({
      type: 'noteModel/createNote',
      payload: data,
    });
  }, []);

  const handleOnPressEnter = useCallback(e => {
    handleCreateNote(e.target.value);
    setInputValue('');
  }, []);

  const handleOnKeyPress = useCallback(e => {
    setInputValue(e.target.value);
  }, []);

  const handleDeleteNote = useCallback(data => {
    dispatch({
      type: 'noteModel/deleteNote',
      payload: data,
    });
  }, []);

  const handleUpdateNote = useCallback((data, index, value) => {
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
    } else if (index === 'progress_percent') {
      updateObj.progress_percent = value;
    }
    dispatch({
      type: 'noteModel/updateNote',
      payload: updateObj,
    });
  }, []);

  const showComments = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const searchBoxCb = useCallback(() => {}, []);

  const showNoti = useCallback(() => {
    toast('Wow so easy !');
  }, []);

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
        let timeout;
        return (
          <Input
            className="content"
            onChange={e => {
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
      title: 'Assignee',
      dataIndex: null,
      render: data => {
        return (
          <div>
            <SearchBox dataObj={data} cb={searchBoxCb} />
          </div>
        );
      },
    },
    {
      title: 'In Progress',
      dataIndex: null,
      width: 150,
      render: data => {
        let timeoutSlider;
        return (
          // <Checkbox
          //   checked={data.is_doing}
          //   disabled={data.is_done}
          //   onChange={() => handleUpdateNote(data, 'is_doing')}
          // />
          <Slider
            disabled={data.is_done}
            defaultValue={data.progress_percent || 0}
            tooltipVisible
            onChange={e => {
              if (timeoutSlider) clearTimeout(timeoutSlider);
              timeoutSlider = setTimeout(() => {
                handleUpdateNote(data, 'progress_percent', e);
              }, 300);
            }}
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
            <div onClick={() => showNoti()} className="deleteIcon">
              <Icon type="notification" />
            </div>
          </div>
        );
      },
    },
  ];

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
      <Modal
        title="Comments"
        visible={visible}
        onOk={() => {
          setVisible(!visible);
        }}
        onCancel={() => {
          setVisible(!visible);
        }}
        loading
        bodyStyle={{ height: '60vh', overflowY: 'auto' }}
        footer={
          <Row>
            <Spin spinning={!!loadingPostComment}>
              <Col xs={24} justify="center">
                <div className={styles.commentEditor}>
                  <textarea
                    value={commentText}
                    onChange={evt => {
                      setCommentText(evt.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col xs={24} className={styles.submitButton}>
                <Button key="submit" type="primary" onClick={onPostComment}>
                  Comment
                </Button>
              </Col>
            </Spin>
          </Row>
        }
      >
        <CommentList taskId={1} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default connect(({ noteModel, loading, user }) => {
  return {
    notes: noteModel.notes,
    loading: loading.models.noteModel,
    user: user.currentUser,
    loadingPostComment: loading.effects['taskListDraftModel/postComment'],
  };
})(Note);
