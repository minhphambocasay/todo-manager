import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Info extends Component {
  render() {
    const { currentUser } = this.props;
    return <div>{currentUser.name}</div>;
  }
}

export default Info;
