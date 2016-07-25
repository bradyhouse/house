
class Photo extends Base {
  get config() {
    return {
      url: '',
      title: '',
      width: '0',
      height: '0',
      json: null
    }
  }

  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config);
    }
    this.init();
  }

  init() {
    let title = this.json && this.json.hasOwnProperty('title') ? this.json.title : '',
        mediaGroup = this.json && this.json.hasOwnProperty('media:group') ? this.json['media:group'] : null,
        mediaContent = mediaGroup && mediaGroup.hasOwnProperty('media:content') ? mediaGroup['media:content']: null,
        content = mediaContent && mediaContent.hasOwnProperty('$') ? mediaContent['$']: null;

    if (content) {
        this.title = title;
        this.url = content.hasOwnProperty('url') ? content.url : '';
        this.width = content.hasOwnProperty('width') ? content.width : '0';
        this.height = content.hasOwnProperty('height') ? content.height : '0';
    }
  }

}
