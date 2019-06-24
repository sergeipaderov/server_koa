const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  try {
    ctx.render('index');
  } catch (error) {
    console.error('err', error);
    ctx.status = 404;
  }
});

module.exports = router;
