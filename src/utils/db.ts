import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import {
  GetItemOutput,
  Key,
  PutItemInputAttributeMap,
  PutItemOutput,
} from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { logger } from '.';

// console.log(`Setting region to ${process.env.AWS_REGION}`);
// AWS.config.update({ region: process.env.AWS_REGION });

const serviceConfigOptions: ServiceConfigurationOptions = {
  accessKeyId: 'YOURKEY',
  secretAccessKey: 'YOURSECRET',
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
};

const dynamodb = new AWS.DynamoDB(serviceConfigOptions);
const mapper = new DataMapper({
  client: dynamodb, // the SDK client used to execute operations
});

class DbContext<T> {
  private type;
  constructor(type: new () => T) {
    this.type = type;
  }

  get = async (id: string): Promise<T> => {
    let result;
    try {
      logger.info(`Getting item with id ${id}`);
      result = (await mapper.get(Object.assign(new this.type(), { id }))) as T;
      logger.info(result, 'Get successful');
    } catch (error) {
      logger.error(`Get failed: ${error.message}`);
      throw error;
    }

    return result;
  };
}

export { DbContext };
