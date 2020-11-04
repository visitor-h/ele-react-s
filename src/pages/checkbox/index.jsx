import Markdown from '../../libs/markdown';

import './style.scss';

export default class Checkbox extends Markdown {
  document() {
    return require(`../../docs/checkbox.md`);
  }
}
