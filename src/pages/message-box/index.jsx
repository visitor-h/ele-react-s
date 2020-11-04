import Markdown from '../../libs/markdown';

import './style.scss';

export default class MessageBox extends Markdown {
  document() {
    return require(`../../docs/message-box.md`);
  }
}
