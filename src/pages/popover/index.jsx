import Markdown from '../../libs/markdown';

import './style.scss';

export default class Popover extends Markdown {
  document() {
    return require(`../../docs/popover.md`);
  }
}
