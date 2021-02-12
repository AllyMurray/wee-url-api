import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';

import { container } from './inversify.config';

import './url/url.controller';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
});

export default server.build();
