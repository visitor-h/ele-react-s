import Markdown from '../../libs/markdown';

import './style.scss';

export default class Rate extends Markdown {
  document() {
    return require(`../../docs/rate.md`);
  }
}
