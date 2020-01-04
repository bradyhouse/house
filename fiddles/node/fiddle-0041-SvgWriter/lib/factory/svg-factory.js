'use strict';
const fs = require('fs');
const Base = require('../base');
const tags = require('../tags');
const Util = require('../statics');

class SvgFactory extends Base {

  static get config() {
    return {
       width: 1024,
       height: 768,
       imageWidth: 392,
       imageHeight: 692.66,
       images: [],
       svgFileName: 'image-cloud.svg'
    };
  }

  static factory(config) {
    return new SvgFactory(config || this.config);
  }

  constructor(config) {
    super();
    this._configErrors = [];
    this.apply(this, config || this.config, this.config);
  }

  cleanup(callbackFn) {
    if (fs.existsSync('./' + this.svgFileName)) {
      console.log('cleanup\t\t','deleting ' + this.svgFileName);
      fs.unlink('./' + this.svgFileName,(err) => {
        if(err) {
          this.emit('error', err);
        } else {
          callbackFn();
        }
      });
    } else {
      callbackFn();
    }
  }

  buildFile(html) {
    this.cleanup(() => {
      console.log('build\t\t','initializing ' + this.svgFileName);
      const writeStream = fs.createWriteStream(this.svgFileName);
      writeStream.write(html);
      writeStream.end();
      this.emit('complete', {
        status: 'complete'
      });
    });
  }

  build() {
    let objects = [],
      center = {
        x: this.width / 2,
        y: this.height / 2,
      };
    objects.push(tags.pattern.factory({
        id: 'gridPattern',
        width: 10,
        height: 10,
        units: 'userSpaceOnUse',
        children: [
            tags.path.factory({
                data: 'M10 0 L0 0 L0 10',
                fill: null,
                stroke: 'yellow',
                strokeWidth: '0.25'
            })
        ]
    }));
    objects.push(tags.rectangle.factory({
      id: 'root',
      x: 0,
      y: 0,
      height: '100%',
      width: '100%',
      fill: 'url(#gridPattern)'
    }));

    if (this.images && this.images.length) {
      const image = this.images[0];
      this.images.forEach((image, index) => {
        const imageId = image.name.split('.')[0];
        const imageString = 'data:image/png;base64,' + image.image;
        const radius = this.width < this.height ? this.width : this.height;
        const randX = Util.rand(0, this.width);
        const randY = Util.rand(0, this.height);
        const dur = Util.rand(120, 240) + 's';
        const circularPathArr = Util.toCircularPointArray(randX, randY, radius);
        const startingIndex = Util.rand(0, circularPathArr.length - 1);
        const startingPoint = circularPathArr[startingIndex];
        const reorderedPathArr = Util.reorderFrom(circularPathArr, startingIndex);
        const animatedValues1 = Util.flattenToValues(reorderedPathArr, 'x');
        const animatedValues2 = Util.flattenToValues(reorderedPathArr, 'y');
        const animateX = tags.animate.factory({
          attributeName: 'x',
          dur: dur,
          values: animatedValues1,
          repeatCount: 'indefinite'
        });
        const animateY = tags.animate.factory({
          attributeName: 'y',
          dur: dur,
          values: animatedValues2,
          repeatCount: 'indefinite'
        });
        const animateOpacity = tags.animate.factory({
          attributeName: 'opacity',
          values: '1;.9;.8;.7;.6;.5;.6;.7;.8;.9',
          dur: dur,
          repeatCount: 'indefinite'
        });
        objects.push(tags.image.factory({
          id: imageId,
          width: objects.length % 4 === 0 ? Math.floor((+this.imageWidth / 2)) : Math.floor((+this.imageWidth) / 3),
          height: objects.length % 4 === 0 ? Math.floor((+this.imageHeight /2)) : Math.floor((+this.imageHeight) / 3),
          x: startingPoint.x,
          y: startingPoint.y,
          xlinkHref: imageString,
          opacity: '.5',
          children: [animateOpacity, animateX, animateY]
        }));
      });
    }

    const svg = tags.surface.factory({
      id: 'fiddle',
      children: objects,
      style: 'width: calc(100%); height: calc(100%); min-height: 500px; min-width: 500px; background-color: black;'
    });
    this.innerHTML = svg.innerHTML;

    this.buildFile(svg.innerHTML);
  }

}

module.exports = SvgFactory;
