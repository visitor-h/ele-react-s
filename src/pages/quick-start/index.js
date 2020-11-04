import Markdown from '../../libs/markdown';

export default class QuickStart extends Markdown {
  document() {
    return require(`../../docs/quick-start.md`);
  }
}
