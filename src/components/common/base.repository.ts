import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { injectable, unmanaged } from 'inversify';
import { database } from '../../utils';
import { logger } from '../../utils';

@injectable()
export abstract class BaseRepository<T> {
  private tableName: string;
  constructor(@unmanaged() tableName: string) {
    this.tableName = tableName;
  }

  async get(id: string): Promise<T | undefined> {
    const result = await database.get(this.tableName, id);

    let item: T | undefined;
    if (result.Item) {
      logger.info(`Item found for id ${id}`);
      item = ({ ...result.Item } as unknown) as T;
      logger.info({ result }, 'Get successful');
    } else {
      logger.info(`Item not found for id ${id}`);
    }

    return item;
  }

  async create(item: T): Promise<T> {
    await database.create(this.tableName, (item as unknown) as PutItemInput);
    return item;
  }
}

export default BaseRepository;
