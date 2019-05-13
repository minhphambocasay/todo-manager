import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(({ user }) => ({
  user,
}))
class Analysis extends PureComponent {
  render() {
    console.log(this);
    return <div>This is Analysis Page</div>;
  }
}

export default Analysis;
