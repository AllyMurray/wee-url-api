import { injectable } from 'inversify';
import { DbContext } from '../../utils';
import Url from './url';

const dbContext = new DbContext(Url);

@injectable()
export class UrlRepository {
  async get(id: string): Promise<Url> {
    return dbContext.get(id);
  }
}

export default UrlRepository;
