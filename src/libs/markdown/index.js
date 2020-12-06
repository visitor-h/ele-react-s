import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';

import Canvas from './canvas'

export default class Markdown extends React.Component {
    constructor(props) {
        super(props);

        this.components = new Map;

        this.renderer = new marked.Renderer();
        this.renderer.table = (header, body) => {
            return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
        };
    }

    // 加载完毕 后将 代码块部分的 html 插入到相应的 div.id 中
    componentDidMount() {
        this.renderDOM();
    }

    // 当每次有数据改变时，我们进行重新渲染 dom，重新插入
    componentDidUpdate() {
        this.renderDOM();
    }

    renderDOM() {
        for (const [id, component] of this.components) {
            const div = document.getElementById(id);

            if (div instanceof HTMLElement) {
                ReactDOM.render(component, div);
            }
        }
        prism.highlightAll();
    }

    render() {
        // 1. 获取 相应 markdown.md 中的文本内容
        const document = this.document();

        if(typeof document === 'string') {

            this.components.clear();  // 清空 Map

            // 2. 将上面拿到的文本字符串 经过正则匹配处理的文本，内部的 React js 代码块 替换成一个 div.id 节点
            let _html = document.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
                const id = offset.toString(36);
                // 在 Map 对象上设置  key：id 36进制  value：markdown.md 中 正则匹配到的一道 代码， 并传入属性
                // 2.1 注意这里的 Canvas 主要是将匹配到的 React jsx 字符串 转为一个 react 组件，用于页面点击操作
                this.components.set(id, React.createElement(Canvas, Object.assign({
                    name: this.constructor.name.toLowerCase()
                }, this.props), p1))
                // 将 匹配到的 :::\s?demo\s?([^]+?)::: 替换成下面的 div.id 节点
                return `<div id=${id}></div>`;
            })

            // 3. 将上面的文本字符串转为了一个 html 的文本字符串
            let html = marked(_html, { renderer: this.renderer })

            // 4. 将上面的html字符串 插入到div， 返回一个 jsx
            return <div dangerouslySetInnerHTML={{
                __html: html
            }} />
        } else {
            return <span />
        }
    }
}

