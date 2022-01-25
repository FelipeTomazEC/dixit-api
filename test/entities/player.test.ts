import { Player } from '@entities/player';
import faker from 'faker';

describe('Player entity tests', () => {
  it('must validate the name.', () => {
    const result = Player.create({
      username: '    ',
      avatar: faker.internet.avatar(),
    });
    expect(result.isFailure()).toBe(true);
  });

  it('must validate the avatar.', () => {
    const result = Player.create({
      username: faker.internet.userName(),
      avatar: null as unknown as string,
    });
    expect(result.isFailure()).toBe(true);
  });

  it('must create a user.', () => {
    const result = Player.create({
      username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
    });
    expect(result.isSuccess()).toBe(true);
    expect(result.value).toBeTruthy();
    expect(result.value).toBeInstanceOf(Player);
  });
});
