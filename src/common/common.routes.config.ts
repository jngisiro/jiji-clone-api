import express from 'express';

export class CommonRoutesConfig {
  // app: express.Application;
  // name: string;
  constructor(public app: express.Application, public name: string) {}

  getName() {
    return this.name;
  }
}

export interface configureRoutes {}
