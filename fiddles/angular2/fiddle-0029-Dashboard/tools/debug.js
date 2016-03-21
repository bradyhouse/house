var yargs_1 = require('yargs');
var gulp = require('gulp');
require('../gulpfile');
var TASK = yargs_1.argv['task'];
if (!TASK) {
    throw new Error('You must specify a task name.');
}
console.log('**********************');
console.log('* angular2-seed tools ');
console.log('* debugging task:', TASK);
console.log('**********************');
gulp.start(TASK);
//# sourceMappingURL=debug.js.map