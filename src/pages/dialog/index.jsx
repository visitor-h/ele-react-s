import Markdown from '../../libs/markdown';

import './style.scss';

export default class Dialog extends Markdown {
  document() {
    return require(`../../docs/dialog.md`);
  }
}
