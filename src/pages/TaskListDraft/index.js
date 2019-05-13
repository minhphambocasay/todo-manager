import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CommentList from '@/components/CommentList';

const TaskListDraft = () => {
  const [visible, setVisible] = useState(false);

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
        bodyStyle={{ height: '60vh', overflowY: 'auto' }}
      >
        <CommentList taskId={1} />
      </Modal>
    </div>
  );
};

export default TaskListDraft;
