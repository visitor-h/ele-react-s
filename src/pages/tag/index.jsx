import Markdown from '../../libs/markdown';

import './style.scss';

export default class Tag extends Markdown {
  document() {
    return require(`../../docs/tag.md`);
  }
}
