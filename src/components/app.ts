import 'reflect-metadata';
import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';

// Ensure the environment variables are loaded before any code is executed
dotenv.config();

import { container } from './inversify.config';

import './url/url.controller';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
});

export default server.build();
