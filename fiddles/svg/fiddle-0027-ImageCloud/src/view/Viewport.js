
class Viewport extends Surface {
  constructor(config) {
    super({
      id: 'fiddle',
      hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
      height: Math.floor((window.innerHeight)) + 'px',
      width: Math.floor((window.innerWidth)) + 'px',
      autoBind: true,
      children: config && config.hasOwnProperty('children') ? config.children : []
    });
  }
}
