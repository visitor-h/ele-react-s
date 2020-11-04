import Markdown from '../../libs/markdown';

import './style.scss';

export default class Progress extends Markdown {
  document() {
    return require(`../../docs/progress.md`);
  }
}
