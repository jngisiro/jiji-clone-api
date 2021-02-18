import express, { Request, Response } from 'express';
import { UsersService } from './services/user.services';

export class UsersController {
  listUsers(req: Request, res: Response) {
    const userService = UsersService.getInstance();
    const users = userService.list();

    res.status(200).send(users);
  }

  getUserById(req: Request, res: Response) {
    const userService = UsersService.getInstance();
    console.log(req.params);
    const user = userService.readById(req.params.id);

    res.status(200).send(user);
  }

  createUser(req: Request, res: Response) {
    const userService = UsersService.getInstance();
    const userId = userService.create(req.body);

    res.status(201).send({ id: userId });
  }

  patch(req: Request, res: Response) {
    const userService = UsersService.getInstance();
    userService.patchById(req.params.id);

    res.status(204).send('');
  }

  put(req: Request, res: Response) {
    const userService = UsersService.getInstance();
    userService.updateById(req.body);

    res.status(204).send('');
  }

  removeUser(req: Request, res: Response) {
    const userService = UsersService.getInstance();
    userService.deleteById(req.params.id);

    res.status(204).send('');
  }
}
