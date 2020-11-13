import React from 'react'
import Markdown from 'libs/markdown'

export default class Button extends Markdown {
  document() {
    return require('docs/button.md').default
  }
}


