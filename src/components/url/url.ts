import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { DateTime } from 'luxon';

@table('url')
class Url {
  @hashKey()
  id!: string;

  @attribute()
  url!: string;

  @attribute({ defaultProvider: () => 0 })
  viewCount!: number;

  @attribute({ defaultProvider: () => DateTime.utc().toISOTime() })
  createdAt!: string;
}

export default Url;
