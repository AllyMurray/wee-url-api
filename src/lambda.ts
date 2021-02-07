import serverlessExpress from '@vendia/serverless-express';
import app from './components/app';

exports.handler = serverlessExpress({ app }).handler;
