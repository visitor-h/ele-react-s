import Markdown from '../../libs/markdown';

import './style.scss';

export default class i18n extends Markdown {
  document() {
    return require(`../../docs/i18n.md`);
  }
}
