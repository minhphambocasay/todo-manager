import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MemberDetailForm from '../components/MemberDetaiForm';

const MemderDetail = ({ fetching, member }) => {
  return (
    <PageHeaderWrapper>
      <Card>
        <MemberDetailForm loading={fetching} formType="VIEW" memberDetail={member} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default React.memo(
  connect(({ memberModel, loading }) => ({
    member: memberModel.member,
    fetching: loading.effects['memberModel/fetchMemberDetail'],
  }))(MemderDetail)
);
