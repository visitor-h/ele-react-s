import Markdown from '../../libs/markdown';

import './style.scss';

export default class Menu extends Markdown {
  document() {
    return require(`../../docs/menu.md`);
  }
}
