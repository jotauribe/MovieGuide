const Nightmare = require('./nightmare');

async function run() {
  const nightmare = Nightmare({
    maxWidth: 1204,
    maxHeight: 800,
    gotoTimeout: 10000,
    loadTimeout: 10000,
    waitTimeout: 10000,
    show: true
  });

  await nightmare.onBeforeRequest((details, cb) => {
    if (details.resourceType === 'image') {
      return cb({ cancel: true });
    }
    cb({ cancel: false });
  });

  nightmare
    .viewport(1024, 1800)
    .goto('https://www.pelispedia.tv/movies/all/')
    .wait('#mainContent > section > div.contenidoss > a')
    .click('#mainContent > section > div.contenidoss > a')
    .wait(5000)
    .then(() => {
      nightmare.end();
    });
}

run();
