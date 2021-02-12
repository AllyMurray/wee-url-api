import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { logger } from '.';

const serviceConfigOptions: ServiceConfigurationOptions = {
  accessKeyId: 'YOURKEY',
  secretAccessKey: 'YOURSECRET',
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
};

const documentClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);

class DbContext<T> {
  private tableName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  get = async (id: string): Promise<T | undefined> => {
    let result: T | undefined;
    try {
      logger.info(`Getting item with id ${id}`);
      const params = {
        TableName: this.tableName,
        Key: { id },
      };
      const itemOutput = await documentClient.get(params).promise();
      if (itemOutput.Item) {
        logger.info(`Item found for id ${id}`);
        result = ({ ...itemOutput.Item } as unknown) as T;
        logger.info(result, 'Get successful');
      } else {
        logger.info(`Item not found for id ${id}`);
      }
    } catch (error) {
      logger.error(`Get failed: ${error.message}`);
      throw error;
    }

    return result;
  };
}

export { DbContext };
