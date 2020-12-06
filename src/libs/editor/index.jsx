import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'codemirror'

import 'codemirror/mode/jsx/jsx'
import 'codemirror/keymap/sublime'
import 'codemirror/addon/comment/comment'

import 'codemirror/lib/codemirror.css'
import './index.scss'

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,     // 传入的react js组件 代码字符串
}

export default function Editor(props) {

  const { onChange, value } = props
  const editRef = useRef()

  useEffect(() => {
    const cm = CodeMirror(editRef.current, {
      mode: 'jsx',
      theme: 'react',
      keyMap: 'sublime',
      viewportMargin: Infinity,
      lineNumbers: false,
      dragDrop: false
    })

    cm.setValue(value)

    let timeout = null
    // 当在 edit 中 编辑代码时， 会触发该事件， 即只要有内容变动就触发
    cm.on('changes', _cm => {
      if(onChange) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          onChange(_cm.getValue())   // 将改动后的代码字符串返回
        }, 300)
      }
    })
  }, [])

  return <div className="editor" ref={editRef} />
}
