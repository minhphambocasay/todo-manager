import React, { useCallback } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MemberDetailForm from '../components/MemberDetaiForm';

const MemderEdit = ({ fetching, member, updating, dispatch }) => {
  const updateMember = useCallback(requestParams => {
    dispatch({
      type: 'memberModel/updateMemberDetail',
      payload: requestParams,
    });
  });

  return (
    <PageHeaderWrapper>
      <Card>
        <MemberDetailForm
          loading={fetching}
          formType="EDIT"
          memberDetail={member}
          submiting={updating}
          actionUpdate={updateMember}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default React.memo(
  connect(({ memberModel, loading }) => ({
    member: memberModel.member,
    fetching: loading.effects['memberModel/fetchMemberDetail'],
    updating: loading.effects['memberModel/updateMemberDetail'],
  }))(MemderEdit)
);
