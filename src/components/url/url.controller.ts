import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpDelete,
  request,
  response,
  requestParam,
} from 'inversify-express-utils';

@controller('/url')
export class UrlController implements interfaces.Controller {
  @httpGet('/')
  private read(req: Request, res: Response): Response {
    return res.json({
      url: 'https://github.com/inversify/inversify-express-utils',
    });
  }

  @httpPost('/')
  private create(@request() req: Request, @response() res: Response): Response {
    console.log(`Create short url for ${req.body.url}`);
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
