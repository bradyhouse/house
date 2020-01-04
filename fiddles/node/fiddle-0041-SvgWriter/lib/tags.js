'use strict';

const Surface = require('./tag/surface');
const Rectangle = require('./tag/rectangle');
const Image = require('./tag/image');
const Animate = require('./tag/animate');
const Pattern = require('./tag/pattern');
const Path = require('./tag/path');

module.exports = {
  animate: Animate,
  surface: Surface,
  rectangle: Rectangle,
  image: Image,
  pattern: Pattern,
  path: Path
};

