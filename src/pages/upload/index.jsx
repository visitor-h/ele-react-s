import Markdown from '../../libs/markdown';

import './style.scss';

export default class Upload extends Markdown {
  document() {
    return require(`../../docs/upload.md`);
  }
}
