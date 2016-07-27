
/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG),=
 * "<animate>" tag.  For example --
 *
 * <animate attributeName="cy" dur="10s" values="0%;100%" repeatCount="indefinite"></animate>
 *
 * For additional info,
 * see [MDN ... Animate](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate).
 *
 */
class Animate extends Base {

  config() {
    return {
      attributeName: 'cy',
      attributeType: null,
      from: null,
      to: null,
      dur: '10s',
      values: '0%;100%',
      repeatCount: 'indefinite',
      autoBind: false
    }
  }

  /**
   * Class constructor.
   *
   * @param config
   */
  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config());
    }
    this.init();
  }

  /**
   * Method used to append the docElement to
   * configured hook element.
   */
  bind() {
    if (this.hook && this.docElementNS) {
      this.hook.appendChild(this.docElementNS);
    }
  }

  /**
   * Method called by the constructor to create
   * and assign docElement based
   * on the properties exposed by the class.
   *
   * Note - if the autoBind flag is true,
   * then it ends by invoking bind method.
   */
  init() {
    this.docElementNS = document.createElementNS(this.xmlns, 'animate');

    if (this.attributeName) {
      this.docElementNS.setAttribute('attributeName', this.attributeName);
    }

    if (this.attributeType) {
      this.docElementNS.setAttribute('attributeType', this.attributeType);
    }

    if(this.from) {
      this.docElementNS.setAttribute('from', this.from);
    }

    if(this.to) {
      this.docElementNS.setAttribute('to', this.to);
    }

    if(this.dur) {
      this.docElementNS.setAttribute('dur', this.dur);
    }

    if(this.values) {
      this.docElementNS.setAttribute('values', this.values);
    }

    if(this.repeatCount) {
      this.docElementNS.setAttribute('repeatCount', this.repeatCount);
    }

    if (this.autoBind) {
      this.bind();
    }
  }

}
