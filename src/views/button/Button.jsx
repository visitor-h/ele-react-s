import React from 'react';
import { Component, PropTypes } from 'libs'

export default class Button extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    nativeType: PropTypes.string,    // 原生 type 属性  button,submit,reset
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    plain: PropTypes.bool           // 是否朴素按钮
  }

  static defaultProps = {
    type: 'default',
    nativeType: 'button',
    loading: false,
    disabled: false,
    plain: false
  }

  onClick = (e) => {
    // 加载的情况不能点击，如果组件上写了 onClick 那么才能点击
    if(!this.props.loading) {
      this.props.onClick && this.props.onClick(e);
    }
  }

  render() {
    return (
      <button
        style={this.style()}
        className={
          this.className(
            'el-button',
            this.props.type && `el-button--${this.props.type}`,
            this.props.size && `el-button--${this.props.size}`,
            {
              'is-disabled': this.props.disabled,
              'is-loading': this.props.loading,
              'is-plain': this.props.plain  // 是否朴素按钮
            }
          )
        }
        disabled={this.props.disabled}
        type={this.props.nativeType /* 原生 type 属性 button,submit,reset */}
        onClick={this.onClick}
      >
        { this.props.loading && <i className="el-icon-loading" /> }
        { this.props.icon && !this.props.loading && <i className={`el-icon-${this.props.icon}`} /> }
        <span>{this.props.children}</span>
      </button>
    )
  }
}
