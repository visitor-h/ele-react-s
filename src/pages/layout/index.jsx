import Markdown from '../../libs/markdown';

import './style.scss';

export default class Layout extends Markdown {
  document() {
    return require(`../../docs/layout.md`);
  }
}
