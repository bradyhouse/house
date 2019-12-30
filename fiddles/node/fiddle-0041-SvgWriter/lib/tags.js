'use strict';

Animate = require('./tag/animate');
AnimateTransform = require('./tag/animate-transform');
Circle = require('./tag/circle');
Definition = require('./tag/definition');
Group = require('./tag/group');
Image = require('./tag/image');
LinearGradient = require('./tag/linear-gradient');
Path = require('./tag/path');
Pattern = require('./tag/pattern');
RadialGradient = require('./tag/radial-gradient');
Rectangle = require('./tag/rectangle');
Setter = require('./tag/setter');
Stop = require('./tag/stop');
Surface = require('./tag/surface');
TextPath = require('./tag/text-path');
Text = require('./tag/text');

module.exports = {
  animate: Animate,
  animateTransform: AnimateTransform,
  circle: Circle,
  definition: Definition,
  group: Group,
  image: Image,
  linearGradient: LinearGradient,
  path: Path,
  pattern: Pattern,
  radialGradient: RadialGradient,
  rectangle: Rectangle,
  setter: Setter,
  stop: Stop,
  surface: Surface,
  textPath: TextPath,
  text: Text
};

