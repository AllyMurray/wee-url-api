import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { AWS_KEY, AWS_REGION, AWS_SECRET, DYNAMODB_ENDPOINT } from '../config';
import { logger } from '.';

import DocumentClient = AWS.DynamoDB.DocumentClient;

const serviceConfigOptions: ServiceConfigurationOptions = {
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_REGION,
  endpoint: DYNAMODB_ENDPOINT,
};

const documentClient = new DocumentClient(serviceConfigOptions);

const get = async (
  tableName: string,
  id: string,
): Promise<DocumentClient.GetItemOutput> => {
  let itemOutput: DocumentClient.GetItemOutput;
  try {
    logger.info(`Get item from ${tableName} with id ${id}`);
    const params = {
      TableName: tableName,
      Key: { id },
    };
    itemOutput = await documentClient.get(params).promise();
    logger.info(itemOutput, 'Get successful');
  } catch (error) {
    logger.error(`Get failed: ${error.message}`);
    throw error;
  }

  return itemOutput;
};

const create = async (
  tableName: string,
  item: DocumentClient.PutItemInput,
): Promise<DocumentClient.PutItemOutput> => {
  let itemOutput: DocumentClient.PutItemOutput;
  try {
    logger.info(item, `Put item in ${tableName}`);
    const params = {
      TableName: tableName,
      Item: item,
    };
    itemOutput = await documentClient.put(params).promise();
    logger.info({ itemOutput });
    logger.info(itemOutput, 'Put successful');
  } catch (error) {
    logger.error(`Put failed: ${error.message}`);
    throw error;
  }

  return itemOutput;
};

export const database = { get, create };
