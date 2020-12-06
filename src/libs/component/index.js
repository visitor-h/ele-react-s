import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }

  // 类操作，省的每次引 可以直接 this 中调用
  classNames(...args) {
    return classnames(args);
  }

  // this.className('a', 'b')  还会增加上 props.className 'c'  --> 'a b c'
  // 用于增加组件上写的类
  className(...args) {
    const { className } = this.props;
    return this.classNames.apply(this, args.concat([className]));
  }

  // 同上 会增加 组件上写的 style， 合并成一个
  style(args) {
    const { style } = this.props;
    return Object.assign({}, args, style)
  }
}
