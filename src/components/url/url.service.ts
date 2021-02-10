import { inject, injectable } from 'inversify';
import { UrlRepository } from './url.repository';

@injectable()
export class UrlService {
  constructor(@inject('UrlRepository') private urlRepo: UrlRepository) {}

  get(id: string): unknown {
    return this.urlRepo.get(id);
  }
}

export default UrlService;
