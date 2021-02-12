import { config } from 'dotenv';

// Load the config before accessing process.env
config();

const PORT: number = parseInt(process.env.PORT || '5000', 10);

export { PORT };
