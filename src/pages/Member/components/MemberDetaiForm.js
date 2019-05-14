import React, { Fragment } from 'react';
import { Form, Input, Button, Row, Col, Select, Skeleton } from 'antd';
import router from 'umi/router';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

const AvatarView = ({ avatar, firstName, lastName, title }) => (
  <Fragment>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <div className={styles.info}>
      <div>
        {firstName} {lastName}
      </div>
      <div>{title}</div>
    </div>
  </Fragment>
);

const MemberDetail = ({ form, memberDetail, loading, submiting, formType, actionUpdate }) => {
  const { getFieldDecorator } = form;

  const handleOnSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('values', values);
        actionUpdate(values);
      }
    });
  };

  const prefixPhoneSelector = getFieldDecorator('prefix', {
    initialValue: '84',
  })(
    <Select disabled={formType === 'VIEW'} style={{ width: 70 }}>
      <Option value="84">+84</Option>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  const handleOnBack = () => {
    router.push('/members');
  };

  return (
    <Row gutter={16}>
      <Col span={3} offset={1}>
        {loading ? (
          <Skeleton loading={loading} active />
        ) : (
          <AvatarView
            avatar={memberDetail.avatar}
            firstName={memberDetail.first_name}
            lastName={memberDetail.last_name}
            title={memberDetail.title}
          />
        )}
      </Col>
      <Col span={8} offset={1}>
        {loading ? (
          <Skeleton loading={loading} active />
        ) : (
          <Form layout="vertical" onSubmit={handleOnSubmit} hideRequiredMark={formType === 'VIEW'}>
            <FormItem label="Title">
              {getFieldDecorator('title', {
                initialValue: memberDetail.title,
                rules: [{ required: true }],
              })(
                <Select disabled={formType === 'VIEW'}>
                  <Option value="React Js Developer">React Js Developer</Option>
                  <Option value="PHP Developer">PHP Developer</Option>
                  <Option value="Technical Leader">Technical Leader</Option>
                  <Option value="Poject Manager">Project Manager</Option>
                  <Option value="HR Manager">HR Manager</Option>
                  <Option value="Official Manager">Manager</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="Group">
              {getFieldDecorator('group', {
                initialValue: memberDetail.group,
                rules: [{ required: true, message: 'Anh son nhap di' }],
              })(<Input disabled={formType === 'VIEW'} />)}
            </FormItem>

            <FormItem label="Email">
              {getFieldDecorator('email', {
                initialValue: memberDetail.email,
                rules: [{ required: true }],
              })(<Input disabled={formType === 'VIEW'} />)}
            </FormItem>

            <FormItem label="Frist Name">
              {getFieldDecorator('first_name', {
                initialValue: memberDetail.first_name,
                rules: [{ required: true }],
              })(<Input disabled={formType === 'VIEW'} />)}
            </FormItem>

            <FormItem label="Last Name">
              {getFieldDecorator('last_name', {
                initialValue: memberDetail.last_name,
                rules: [{ required: true }],
              })(<Input disabled={formType === 'VIEW'} />)}
            </FormItem>

            <Form.Item label="Phone Number">
              {getFieldDecorator('mobile_phone', {
                initialValue: memberDetail.mobile_phone,
                rules: [{ required: true }],
              })(<Input disabled={formType === 'VIEW'} addonBefore={prefixPhoneSelector} />)}
            </Form.Item>

            <FormItem label="Address">
              {getFieldDecorator('address', {
                initialValue: memberDetail.address,
                rules: [{ required: true }],
              })(<Input disabled={formType === 'VIEW'} />)}
            </FormItem>

            <div className={styles.actionBtn}>
              <Button style={{ marginRight: '10px' }} onClick={handleOnBack}>
                Back
              </Button>

              {formType !== 'VIEW' && (
                <Button type="primary" icon="save" loading={submiting} htmlType="submit">
                  Update
                </Button>
              )}
            </div>
          </Form>
        )}
      </Col>
    </Row>
  );
};
const MemberDetailForm = Form.create({})(MemberDetail);

export default MemberDetailForm;
