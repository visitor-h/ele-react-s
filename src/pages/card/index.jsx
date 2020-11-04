import Markdown from '../../libs/markdown';

import './style.scss';

export default class Card extends Markdown {
  document() {
    return require(`../../docs/card.md`);
  }
}

Card.defaultProps = {
  imgSrc: require('./hamburger.png')
}
