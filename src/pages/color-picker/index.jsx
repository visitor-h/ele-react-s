import Markdown from '../../libs/markdown';

import './style.scss';

export default class ColorPicker extends Markdown {
  document() {
    return require(`../../docs/color-picker.md`);
  }
}
