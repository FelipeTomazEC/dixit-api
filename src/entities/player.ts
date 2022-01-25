import { NullOrEmptyValueError } from '@common/errors/null-or-empty-value';
import { Either, failure, success } from '@utils/either';
import { isNullOrEmptyString } from '@utils/isNullOrEmptyString';

interface Props {
  username: string;
  avatar: string;
}

export class Player {
  private constructor(private readonly props: Props) {}

  get username(): string {
    return this.props.username;
  }

  get avatar(): string {
    return this.props.avatar;
  }

  static create({
    username,
    avatar,
  }: Props): Either<NullOrEmptyValueError, Player> {
    if (isNullOrEmptyString(username)) {
      return failure(new NullOrEmptyValueError('username'));
    }

    if (isNullOrEmptyString(avatar)) {
      return failure(new NullOrEmptyValueError('avatar'));
    }

    const player = new Player({
      username: username.trim(),
      avatar: avatar.trim(),
    });

    return success(player);
  }
}
