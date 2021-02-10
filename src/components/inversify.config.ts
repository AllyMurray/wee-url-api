import { Container } from 'inversify';
import UrlRepository from './url/url.repository';
import UrlService from './url/url.service';

// set up container
const container = new Container();

container.bind<UrlService>('UrlService').to(UrlService);
container.bind<UrlRepository>('UrlRepository').to(UrlRepository);

export { container };
