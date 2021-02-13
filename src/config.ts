import { config } from 'dotenv';

// Load the config before accessing process.env
config();

const { AWS_KEY, AWS_REGION, AWS_SECRET, DYNAMODB_ENDPOINT } = process.env;

const PORT: number = parseInt(process.env.PORT || '5000', 10);

export { AWS_KEY, AWS_REGION, AWS_SECRET, DYNAMODB_ENDPOINT, PORT };
