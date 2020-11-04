import Markdown from '../../libs/markdown';

import './style.scss';

export default class Collapse extends Markdown {
  document() {
    return require(`../../docs/collapse.md`);
  }
}
