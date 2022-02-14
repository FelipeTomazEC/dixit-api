import { HttpRequest } from '@interface-adapters/http/http-request';
import { JoinMatchRequest } from '@use-cases/join-match/request';
import { BaseController } from './interfaces/base-controller';

export class JoinMatchController extends BaseController<JoinMatchRequest> {
  protected extractParamsFromRequest(request: HttpRequest): JoinMatchRequest {
    const matchCode = request.getParam<string>('match_code');
    const { avatar, username } = request.body;

    return { matchCode, avatar, username };
  }
}
