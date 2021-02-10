import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { inject } from 'inversify';
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
  request,
  response,
  requestParam,
} from 'inversify-express-utils';
import UrlService from './url.service';

@controller('/url')
export class UrlController implements interfaces.Controller {
  constructor(@inject('UrlService') private urlService: UrlService) {}

  @httpPost('/')
  private create(@request() req: Request, @response() res: Response): Response {
    console.log(`Create short url for ${req.body.url}`);
    return res.json({
      url: 'https://github.com/inversify/inversify-express-utils',
    });
  }

  @httpGet('/:id')
  private get(
    @requestParam('id') id: string,
    @response() res: Response,
  ): Response {
    return this.urlService.get(id) as Response;
    // return res.json({
    //   url: 'https://github.com/inversify/inversify-express-utils',
    // });
  }

  @httpGet('/')
  private getAll(req: Request, res: Response): Response {
    return res.json({
      url: 'https://github.com/inversify/inversify-express-utils',
    });
  }

  @httpPut('/')
  private update(req: Request, res: Response): Response {
    return res.json({
      url: 'https://github.com/inversify/inversify-express-utils',
    });
  }

  @httpDelete('/:id')
  private delete(
    @requestParam('id') id: string,
    @response() res: Response,
  ): Response {
    console.log(`Delete ${id}`);
    return res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
  }
}
