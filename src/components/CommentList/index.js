import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'dva';
import { List, Avatar, Icon, Button, Skeleton } from 'antd';

const CommentList = ({ dispatch, taskId, loading, comments, initLoading }) => {
  const [list, setList] = useState([]);

  if (
    (comments.length !== list.length && !loading) ||
    (comments.length === list.length && list[list.length - 1] && list[list.length - 1].loading)
  ) {
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

  const LikeIcon = useCallback(({ type, text }) => {
    return (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
  }, []);

  const loadMore =
    !initLoading && !loading ? (
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
          <List.Item key={item.id} actions={[<LikeIcon type="like-o" text={item.likedNumber} />]}>
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

export default connect(({ taskListDraftModel, loading }) => ({
  comments: taskListDraftModel.comments,
  loading: loading.models.taskListDraftModel,
  initLoading: taskListDraftModel.initLoading,
}))(CommentList);
