import Markdown from '../../libs/markdown';

import './style.scss';

export default class Badge extends Markdown {
  document() {
    return require(`../../docs/badge.md`);
  }
}
