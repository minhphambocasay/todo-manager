import React, { useEffect, useCallback } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { List, Card, Skeleton, Avatar } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const Members = ({ members, loading, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'memberModel/fetchMembers',
    });
  }, []);

  const viewDetail = useCallback(id => {
    router.push(`/members/detail/${id}`);
  });

  const viewEdit = useCallback(id => {
    router.push(`/members/edit/${id}`);
  });

  const viewTaskList = useCallback(() => {
    console.log('viewTaskList');
    router.push('/notes');
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={members}
          renderItem={item => (
            <List.Item
              actions={[
                <a
                  onClick={e => {
                    e.preventDefault();
                    viewEdit(item.id);
                  }}
                >
                  Edit
                </a>,
                <a
                  onClick={e => {
                    e.preventDefault();
                    viewTaskList();
                  }}
                >
                  {' '}
                  Task List
                </a>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <a onClick={() => viewDetail(item.id)}>
                      {item.first_name} {item.last_name}
                    </a>
                  }
                  description={item.email}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ memberModel, loading }) => ({
  members: memberModel.members,
  loading: loading.models.memberModel,
}))(Members);
