
class Viewport extends Surface {
  constructor(config) {
    super({
      id: 'fiddle',
      hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
      height: $('#fiddleHook').height(),
      width: $('#fiddleHook').width(),
      autoBind: true,
      children: config && config.hasOwnProperty('children') ? config.children : []
    });
  }
}
