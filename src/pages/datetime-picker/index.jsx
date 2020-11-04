import Markdown from '../../libs/markdown';
import './style.scss';

export default class DatePicker extends Markdown {
  document() {
    return require(`../../docs/datetime-picker.md`);
  }
}
