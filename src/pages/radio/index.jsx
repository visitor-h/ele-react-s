import Markdown from '../../libs/markdown';

import './style.scss';

export default class Radio extends Markdown {
  document() {
    return require(`../../docs/radio.md`);
  }
}
