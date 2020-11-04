import Markdown from '../../libs/markdown';

import './style.scss';

export default class Typography extends Markdown {
  documentShouldTransform() {
    return false;
  }

  document() {
    return require(`../../docs/typography.md`);
  }
}
