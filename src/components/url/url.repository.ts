import { injectable } from 'inversify';
import BaseRepository from '../common/base.repository';
import { Url } from './url.interface';

@injectable()
export class UrlRepository extends BaseRepository<Url> {
  constructor() {
    super('url');
  }
}

export default UrlRepository;
