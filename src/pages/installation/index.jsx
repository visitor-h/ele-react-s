import Markdown from '../../libs/markdown';

export default class Installation extends Markdown {
  document() {
    return require(`../../docs/installation.md`);
  }
}
