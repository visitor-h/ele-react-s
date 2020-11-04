import Markdown from '../../libs/markdown';

import './style.scss';

export default class TimePicker extends Markdown {
  document() {
    return require(`../../docs/time-picker.md`);
  }
}
