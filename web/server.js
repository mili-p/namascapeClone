// const { createServer } = require('https');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');

// const app = next({})
// const handle = app.getRequestHandler();

// const httpsOptions = {
//   key: fs.readFileSync('/var/www/html/ssl/namascape.me.key'),
//   cert: fs.readFileSync('/var/www/html/ssl/namascape.me.crt'),
// };

// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(3021, (err) => {
//     if (err) throw err;
//     console.log('> Ready on https://localhost:3017');
//   });
// });

const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const app = next({})
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/var/www/ssl/multiqos.com.key'),
  cert: fs.readFileSync('/var/www/ssl/X509.crt'),
};

app.prepare().then(() => {
  createServer(httpsOptions,(req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3021, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3021');
  });
});
