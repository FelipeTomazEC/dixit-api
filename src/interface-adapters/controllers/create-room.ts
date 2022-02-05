import { HttpRequest } from '@interface-adapters/http/http-request';
import { CreateRoomRequest } from '@use-cases/create-room/request';
import { BaseController } from './interfaces/base-controller';

export class CreateRoomController extends BaseController<CreateRoomRequest> {
  protected extractParamsFromRequest(request: HttpRequest): CreateRoomRequest {
    const creatorAvatar = request.body.creatorAvatar;
    const creatorUsername = request.body.creatorUsername;

    return { creatorAvatar, creatorUsername };
  }
}
