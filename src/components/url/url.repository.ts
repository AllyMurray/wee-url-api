import { injectable } from 'inversify';
import { logger, db } from '../../utils';

@injectable()
export class UrlRepository {
  get(id: string): unknown {
    return db.get('wee-url', { id: { S: id } });
  }
}

export default UrlRepository;
