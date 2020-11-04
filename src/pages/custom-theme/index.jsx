import Markdown from '../../libs/markdown';

export default class CustomTheme extends Markdown {
  document() {
    return require(`../../docs/custom-theme.md`);
  }
}
