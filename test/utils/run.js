var spawn = require('./spawn');
var touchFile = require('./touch-file');

function run(cmd, done) {
  return spawn(cmd, function (out) {
    var touched = false;
    if (!touched && out.match(/touch message.js/)) {
      touchFile();
      touched = true;
      return function (out2) {
        if (out2.match(/Restarting/)) {
          return { exit: done };
        }
      };
    }
  });
}

module.exports = run;
