import express, { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../users/services/user.services';
import bcrypt from 'bcrypt';

export class AuthMiddleware {
  private static instance: AuthMiddleware;

  static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }

    return AuthMiddleware.instance;
  }

  async validateBodyRequest(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({ error: 'Missing body fields: email, password' });
    }
  }

  async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
    const userService = UsersService.getInstance();
    const user: any = await userService.getByEmail(req.body.email);

    if (user) {
      let passwordHash = user.password;
    }
  }
}
