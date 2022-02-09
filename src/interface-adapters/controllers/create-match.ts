import { HttpRequest } from '@interface-adapters/http/http-request';
import { CreateMatchRequest } from '@use-cases/create-match/request';
import { BaseController } from './interfaces/base-controller';

export class CreateMatchController extends BaseController<CreateMatchRequest> {
  protected extractParamsFromRequest(request: HttpRequest): CreateMatchRequest {
    const creatorAvatar = request.body.creatorAvatar;
    const creatorUsername = request.body.creatorUsername;

    return { creatorAvatar, creatorUsername };
  }
}
