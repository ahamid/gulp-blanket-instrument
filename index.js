var through2 = require('through2');  
var PluginError = require('gulp-util').PluginError;
var blanket = require('blanket');

// consts
var PLUGIN_NAME = 'blanket-instrument';

module.exports = function() {
  var b = blanket({'data-cover-flags': { engineOnly: true}}); // engineOnly: don't override require
  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }

    if (file.isStream()) {
      // file.contents is a Stream - https://nodejs.org/api/stream.html
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

    } else if (file.isBuffer()) {
      // file.contents is a Buffer - https://nodejs.org/api/buffer.html
      console.log('instrumenting', file.path);
      b.instrument({ inputFile: file.contents.toString(enc), inputFileName: file.path }, function (instrumented) {
        file.contents = new Buffer(instrumented, enc);
      });
      return cb(null, file);
    }
  });
};
