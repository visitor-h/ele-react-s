import Markdown from '../../libs/markdown';

import './style.scss';

export default class Select extends Markdown {
  document() {
    return require(`../../docs/select.md`);
  }
}
