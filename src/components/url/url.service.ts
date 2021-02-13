import { inject, injectable } from 'inversify';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { UrlRepository } from './url.repository';
import { Url } from './url.interface';

@injectable()
export class UrlService {
  constructor(@inject('UrlRepository') private urlRepo: UrlRepository) {}

  async get(id: string): Promise<Url | undefined> {
    return this.urlRepo.get(id);
  }

  async create(url: string): Promise<Url> {
    const item: Url = {
      id: nanoid(10),
      viewCount: 0,
      url,
      createdAt: DateTime.utc().toISO(),
    };

    return this.urlRepo.create(item);
  }
}

export default UrlService;
