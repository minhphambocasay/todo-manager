import React, {useState} from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import HookComponent from '@/components/HookComponent';
// import ComparationComponent from '@/components/ComparationComponent';

export default () => {
  // const [value, setValue] = useState(0)
  // const onChangeValue = (e) => {
  //   setValue(e.target.value)
  // }
  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <HookComponent />
        {/* <ComparationComponent value={value} />
        <input onChange={onChangeValue} /> */}
      </Card>
    </PageHeaderWrapper>
  )
};
