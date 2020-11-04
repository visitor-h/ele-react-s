import Markdown from '../../libs/markdown';

import './style.scss';

export default class Switch extends Markdown {
  document() {
    return require(`../../docs/switch.md`);
  }
}
