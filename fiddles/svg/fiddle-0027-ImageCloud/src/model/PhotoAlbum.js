
class PhotoAlbum extends Base {

  get config() {
      return {
          json: null,
          children: []
      }
  }

  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config);
      this.init();
    }
  }

  init() {
    if (this.json) {
     if (this.json.rss) {
       if (this.json.rss.channel) {
         if (this.json.rss.channel.item) {
           this.json.rss.channel.item.map((item) => {
             this.children.push(new Photo({
             json: item
           }))});
         }
       }
     }
    }
  }
}
