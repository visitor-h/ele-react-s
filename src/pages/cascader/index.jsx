import Markdown from '../../libs/markdown';

import './style.scss';

export default class Cascader extends Markdown {
  document() {
    return require(`../../docs/cascader.md`);
  }
}
