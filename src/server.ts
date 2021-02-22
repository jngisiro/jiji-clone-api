import { app, routes } from './app';
import * as http from 'http';
import { CommonRoutesConfig } from './common/common.routes.config';

const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});
