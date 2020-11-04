import Markdown from '../../libs/markdown';

import './style.scss';

export default class Dropdown extends Markdown {
  document() {
    return require(`../../docs/dropdown.md`);
  }
}
