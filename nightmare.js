const Nightmare = require('nightmare');

Nightmare.action(
  'onBeforeRequest',
  //define the action to run inside Electron
  function(name, options, parent, win, renderer, done) {
    win.webContents.session.webRequest.onBeforeRequest((details, callback) => {
      // call our event handler
      parent.call('onBeforeRequest', details, res => {
        res ? callback(Object.assign({}, res)) : callback({ cancel: false });
      });
    });
    done();
  },
  function(handler, done) {
    // listen for "onBeforeRequest" events
    this.child.respondTo('onBeforeRequest', handler);
    done();
  }
);

module.exports = Nightmare;
