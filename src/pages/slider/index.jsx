import Markdown from '../../libs/markdown';

import './style.scss';

export default class Slider extends Markdown {
  document() {
    return require(`../../docs/slider.md`);
  }
}
