import { inject, injectable } from 'inversify';
import { UrlRepository } from './url.repository';
import Url from './url';

@injectable()
export class UrlService {
  constructor(@inject('UrlRepository') private urlRepo: UrlRepository) {}

  async get(id: string): Promise<Url> {
    return this.urlRepo.get(id);
  }
}

export default UrlService;
