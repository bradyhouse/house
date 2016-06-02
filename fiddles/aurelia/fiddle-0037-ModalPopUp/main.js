/*******************************************************************************
 * The following two lines enable async/await without using babel's
 * "runtime" transformer.
 * 
 * More info here:  https://github.com/jdanyow/aurelia-plunker/issues/2
 * 
 * Feel free to remove these lines if your plunker doesn't use async/await.
 */
import regeneratorRuntime from 'babel-runtime/regenerator';
window.regeneratorRuntime = regeneratorRuntime;
/******************************************************************************/

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(a => a.setRoot());
}
