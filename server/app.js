const Koa = require('koa');
const app = new Koa();

const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views/pages',
  basedir: './views/pages',
  pretty: true,
  noCache: true,
  app: app
});

const Static = require('koa-static');
app.use(Static('./public'));

const router = require('./router');
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on localhost:3000');
});