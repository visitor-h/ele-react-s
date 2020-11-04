import Markdown from '../../libs/markdown';

import './style.scss';

export default class Form extends Markdown {
  document() {
    return require(`../../docs/form.md`);
  }
}
