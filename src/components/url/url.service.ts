import { inject, injectable } from 'inversify';
import { UrlRepository } from './url.repository';
import { Url } from './url.interface';

@injectable()
export class UrlService {
  constructor(@inject('UrlRepository') private urlRepo: UrlRepository) {}

  async get(id: string): Promise<Url | undefined> {
    return this.urlRepo.get(id);
  }
}

export default UrlService;
