import Markdown from '../../libs/markdown';

import './style.scss';

export default class Pagination extends Markdown {
  document() {
    return require(`../../docs/pagination.md`);
  }
}
