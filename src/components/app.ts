import * as dotenv from 'dotenv';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

export default app;
