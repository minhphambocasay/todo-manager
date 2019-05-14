import React, { useState, useCallback } from 'react';
import { Button, Modal, Row, Col, Spin } from 'antd';
import CommentList from '@/components/CommentList';
import { connect } from 'dva';
import styles from './index.less';

const TaskListDraft = ({ dispatch, user, loadingPostComment }) => {
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

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Open comment modal
      </Button>
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
    </div>
  );
};

export default connect(({ user, loading }) => ({
  user: user.currentUser,
  loadingPostComment: loading.effects['taskListDraftModel/postComment'],
}))(TaskListDraft);
