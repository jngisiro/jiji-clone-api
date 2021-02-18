import express from 'express';
import { UsersRoutes } from './users/users.routes.config';

const app: express.Application = express();

const routes: any[] = [];
routes.push(new UsersRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Default index route');
});

export { app, routes };
