import environment from './environment';

export function configure(aurelia) {

  let meta = {
    fiddleHeader: 'fiddle-0003-ObjectLifeCycle',
      urls: {
      github: 'https://github.com/bradyhouse/house/tree/master/fiddles/aurelia/fiddle-0003-ObjectLifeCycle'
    },
    consoleTag: 'H O U S E ~ f i d d l e s'
  };

  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());

  console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
  console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
  console.group();
}
