import AWS from 'aws-sdk';
import { DateTime } from 'luxon';

const { config, DynamoDB } = AWS;

config.update({
  region: 'eu-west-1',
  endpoint: 'http://localhost:8000',
});

const dynamodb = new DynamoDB();

const prettify = (value) => JSON.stringify(value, null, 2);

const deleteTable = async (tableName) => {
  try {
    const result = await dynamodb
      .deleteTable({ TableName: tableName })
      .promise();
    console.log('Deleted table. Table description JSON:', prettify(result));
  } catch (error) {
    console.error('Unable to delete table. Error JSON:', prettify(error));
  }
};

const createTable = async (tableName) => {
  const params = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }, //Partition key
    ],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };
  try {
    const result = await dynamodb.createTable(params).promise();
    console.log('Created table. Table description JSON:', prettify(result));
  } catch (error) {
    console.error('Unable to create table. Error JSON:', prettify(error));
  }
};

const seedData = async (tableName) => {
  const params = {
    RequestItems: {
      [tableName]: [
        {
          PutRequest: {
            Item: {
              id: { S: 'qIzCxdaAWg' },
              originalUrl: {
                S:
                  'https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write-batch.html',
              },
              viewCount: { N: '1' },
              created: { S: DateTime.utc().toISO() },
            },
          },
        },
        {
          PutRequest: {
            Item: {
              id: { S: 'aWaXTcz6re' },
              originalUrl: {
                S:
                  'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html',
              },
              viewCount: { N: '5' },
              created: { S: DateTime.utc().toISO() },
            },
          },
        },
      ],
    },
  };
  try {
    const result = await dynamodb.batchWriteItem(params).promise();
    console.log('Data seed. Resulting JSON:', prettify(result));
  } catch (error) {
    console.error('Unable to seed data. Error JSON:', prettify(error));
  }
};

const getData = async (tableName) => {
  const params = {
    RequestItems: {
      [tableName]: {
        Keys: [
          { id: { S: 'V1StGXR8_Z5jdHi6B-myT' } },
          { id: { S: 'R1StKXR8_E5jfPi6B-leZ' } },
        ],
        ProjectionExpression: 'id, originalUrl, viewCount, created',
      },
    },
  };
  try {
    const result = await dynamodb.batchGetItem(params).promise();
    console.log('Batch get. Resulting JSON:', prettify(result));
  } catch (error) {
    console.error(
      'Unable to retrieve data from DynamoDB. Error JSON:',
      prettify(error),
    );
  }
};

(async () => {
  const tableName = 'url';
  await deleteTable(tableName);
  await createTable(tableName);
  await seedData(tableName);
  await getData(tableName);
})();
