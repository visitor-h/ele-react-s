import Markdown from '../../libs/markdown';

import './style.scss';

export default class Notification extends Markdown {
  document() {
    return require(`../../docs/notification.md`);
  }
}
