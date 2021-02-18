import express from 'express';
import { json, urlencoded } from 'body-parser';

import { UsersRoutes } from './users/users.routes.config';

const app: express.Application = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const routes: any[] = [];
routes.push(new UsersRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Default index route');
});

export { app, routes };
