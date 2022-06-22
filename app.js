const koa = require('koa');
const app = new koa();
app.use(async (ctx, next) => {
    next();
    console.log('the one');
});

app.use(async (ctx, next) => {
    console.log('the two');
    next();
});

app.use((ctx, next) => {
    console.log('the three');
    next();
});

app.use(ctx => {
    console.log('ready');
    ctx.body = 'hello';
});
console.log('server start ,listen at 3000');
app.listen(3000);