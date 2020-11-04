import Markdown from '../../libs/markdown';

import './style.scss';

export default class Message extends Markdown {
  document() {
    return require(`../../docs/message.md`);
  }
}
