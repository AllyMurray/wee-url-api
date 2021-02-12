import { injectable } from 'inversify';
import { DbContext } from '../../utils';
import { Url } from './url.interface';

const dbContext = new DbContext<Url>('url');

@injectable()
export class UrlRepository {
  async get(id: string): Promise<Url | undefined> {
    return dbContext.get(id);
  }
}

export default UrlRepository;
