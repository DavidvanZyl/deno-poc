import { Application, Router } from 'https://deno.land/x/oak@v4.0.0/mod.ts';

const app = new Application();
const router = new Router();

router.get('/', (context) => {
  context.response.body = 'Hello world!';
});

app.use(router.routes());

await app.listen({ port: 8000 });
console.log("Listing on port 8000");