import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import {
  GetItemOutput,
  Key,
  PutItemInputAttributeMap,
  PutItemOutput,
} from 'aws-sdk/clients/dynamodb';
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

const get = async (tableName: string, key: Key): Promise<GetItemOutput> => {
  const params = {
    TableName: tableName,
    Key: key,
  };

  let result;
  try {
    logger.info(key, `Get item from ${tableName}`);
    result = await dynamodb.getItem(params).promise();
    logger.info(result, 'Get successful');
  } catch (error) {
    logger.error(`Get failed: ${error.message}`);
    throw error;
  }

  return result;
};

const insert = async (
  tableName: string,
  item: PutItemInputAttributeMap,
): Promise<PutItemOutput> => {
  const params = {
    TableName: tableName,
    Item: item,
  };

  let result;
  try {
    logger.info(`Inserting new item into ${tableName}`);
    result = await dynamodb.putItem(params).promise();
    logger.info(result, 'Insert successful');
  } catch (error) {
    logger.error(error, 'Insert failed');
    throw error;
  }

  return result;
};

export const db = { get, insert };
