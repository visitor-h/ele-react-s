import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import { transform } from 'babel-standalone'

import Editor from '../editor'

export default class Canvas extends React.Component {

  static propTypes = {
    locale: PropTypes.object
  }

  static defaultProps = {
    locale: {}
  }

  playerId = `${parseInt(Math.random() * 1e9).toString(36)}`   // 一个随机id
  document = this.props.children.match(/([^]*)\n?(```[^]+```)/)         // 正则匹配主要分成了 1.描述部分 2.代码字符串整体markdown部分
  description = marked(this.document[1])   // 描述部分
  source = this.document[2].match(/```(.*)\n?([^]+)```/)  // 将```  ``` 给去掉，只获取 代码部分

  state = {
    showBlock: false
  }

  componentDidMount() {
    this.renderSource(this.source[2])
  }

  // 点击 显示/隐藏 代码块
  blockControl = () => {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  renderSource = value => {
    // 返回views下所有组件
    import('../../views').then(Element => {
      const args = ['self', 'React', 'ReactDOM']
      const argv = [this, React, ReactDOM]

      // 变量所有组件
      for(const key in Element) {     // Button: class Button extend Component {}
        args.push(key)  // 组件的名字
        argv.push(Element[key])  // 组件
      }

      return {
        args,
        argv,
      }
    }).then(({ args, argv }) => {

      const code = transform(`
        class Demo extends React.Component {
           ${value}
        }
        
        ReactDOM.render(<Demo {...self.props} />, document.getElementById('${this.playerId}'))
      `, {
        presets: ['es2015', 'react']
      }).code

      args.push(code)

      // args 前面的都作为函数的参数，最后的一个code 则代表函数内部执行的代码块
      new Function(...args).apply(null, argv)
      this.source[2] = value
    })
  }

  render() {
    return <div className={`demo-block demo-box demo-${this.props.name}`}>
      <div className="source" id={this.playerId} />
      {
        this.state.showBlock && (
          <div className="meta">
            {
              this.description && (
                <div
                  ref="description"
                  className="description"
                  dangerouslySetInnerHTML={{ __html: this.description }}
                />
              )
            }
            <Editor
              value={this.source[2]}  // 真正的 react jsx 代码部分
              onChange={code => this.renderSource(code)}    // code 是我在edit 页面编辑器中改变代码后返回改变后的代码字符串
            />
          </div>
        )
      }
      <div className="demo-block-control" onClick={this.blockControl}>
        {
          this.state.showBlock ? (
            <span>
                <i className="el-icon-caret-top" />{this.props.locale.hide}
              </span>
          ) : (
            <span>
              <i className="el-icon-caret-bottom" />{this.props.locale.show}
            </span>
          )
        }
      </div>
    </div>
  }
}
