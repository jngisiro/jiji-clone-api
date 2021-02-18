import express, { Request, Response } from 'express';
import {
  CommonRoutesConfig,
  configureRoutes,
} from '../common/common.routes.config';
import { UsersMiddleware } from './middleware/users.middleware';
import { UsersController } from './users.controller';

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, 'UsersRoute');
    this.configureRoutes();
  }

  configureRoutes() {
    const usersMiddleware = UsersMiddleware.getInstance();
    const usersController = new UsersController();

    this.app.get('/users', [usersController.listUsers]);

    this.app.post('/users', [
      usersMiddleware.validateRequiredCreateUserBodyFields,
      usersMiddleware.validateSameEmailDoesntExist,
      usersController.createUser,
    ]);

    this.app.put('/users/:userId', [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.put,
    ]);

    this.app.patch('/users/:userId', [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.patch,
    ]);

    this.app.delete('/users/:userId', [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.removeUser,
    ]);

    this.app.get('/users/:userId', [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.getUserById,
    ]);
  }
}
