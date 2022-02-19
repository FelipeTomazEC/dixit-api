import { createServer } from 'http';
import { createExpressApplication } from '@infra/express/create-express-application';
import { SocketIONotifier } from '@infra/implementations/socket-io-notifier';

const expressApp = createExpressApplication();
const server = createServer(expressApp);
SocketIONotifier.init(server);
const port = process.env.PORT ?? 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
