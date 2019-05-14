import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'dva';
import { List, Avatar, Icon, Button, Skeleton } from 'antd';

const CommentList = ({
  dispatch,
  taskId,
  comments,
  initLoading,
  primaryColor,
  loadingLikeComment,
  loadingMoreComment,
}) => {
  const [list, setList] = useState([]);
  const [prevLoadingLikeComment, setPrevLoadingLikeComment] = useState(false);
  const [prevLoadingMoreComment, setPrevLoadingMoreComment] = useState(false);

  if (prevLoadingLikeComment !== loadingLikeComment) {
    setPrevLoadingLikeComment(loadingLikeComment);
    if (!loadingLikeComment) {
      setList(comments);
    }
  }

  if (prevLoadingMoreComment !== loadingMoreComment) {
    setPrevLoadingMoreComment(loadingMoreComment);
    if (!loadingMoreComment) {
      setList(comments);
    }
  }

  if (comments.length !== list.length && !loadingMoreComment) {
    setList(comments);
  }

  useEffect(() => {
    dispatch({
      type: 'taskListDraftModel/getComments',
      payload: {
        taskId,
      },
    });
  }, []);

  const onLoadMore = useCallback(() => {
    setList(list.concat([...new Array(3)].map(() => ({ loading: true, author: {} }))));
    dispatch({
      type: 'taskListDraftModel/getComments',
      payload: {
        taskId,
      },
    });
  }, [list]);

  const onUpdateLike = useCallback(commentId => {
    dispatch({
      type: 'taskListDraftModel/updateLikeNumber',
      payload: {
        commentId,
      },
    });
  });

  const LikeIcon = useCallback(({ isLiked, type, text, commentId }) => {
    const color = isLiked ? primaryColor : '#00000073';
    return (
      <span>
        <Icon
          onClick={() => {
            onUpdateLike(commentId);
          }}
          type={type}
          style={{ marginRight: 8 }}
          theme="twoTone"
          twoToneColor={color}
        />
        <span style={{ 'pointer-events': 'none' }}>{text}</span>
      </span>
    );
  }, []);

  const loadMore =
    !initLoading && !loadingMoreComment ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>Load more</Button>
      </div>
    ) : null;

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        loadMore={loadMore}
        loading={initLoading}
        dataSource={list}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <LikeIcon
                commentId={item.id}
                isLiked={item.isLikedByMe}
                type="like-o"
                text={item.likedNumber}
              />,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar} />}
                name={item.author.name}
                title={<a href={item.href}>{item.author.name}</a>}
              />
              {item.content}
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default React.memo(
  connect(({ taskListDraftModel, loading, setting }) => ({
    comments: taskListDraftModel.comments,
    initLoading: taskListDraftModel.initLoading,
    primaryColor: setting.primaryColor,
    loadingLikeComment: loading.effects['taskListDraftModel/updateLikeNumber'],
    loadingMoreComment: loading.effects['taskListDraftModel/getComments'],
  }))(CommentList)
);
