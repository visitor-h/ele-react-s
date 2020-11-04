import Markdown from '../../libs/markdown';

import './style.scss';

export default class InputNumber extends Markdown {
  document() {
    return require(`../../docs/input-number.md`);
  }
}
