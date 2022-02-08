import { createExpressApplication } from '@infra/express/create-express-application';

const server = createExpressApplication();
const port = process.env.SERVER_PORT ?? 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
