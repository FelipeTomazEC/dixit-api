import { Match } from '@entities/match';
import { Player } from '@entities/player';
import { Server as HttpServer } from 'http';
import { Notifier } from '@use-cases/common-dependencies/notifier.interface';
import { Server, Socket } from 'socket.io';

export class SocketIONotifier implements Notifier {
  private static instance: SocketIONotifier | null = null;

  private readonly io: Server;

  private readonly playerSocketsMap: Map<string, Socket>;

  private constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONT_END_ORIGIN,
      },
    });

    this.playerSocketsMap = new Map();

    this.io.on('connection', (socket) => {
      socket.on('subscribe', ({ username }) => {
        this.playerSocketsMap.set(username, socket);
      });
    });
  }

  static getInstance(): SocketIONotifier {
    if (!this.instance) {
      throw new Error(
        'Notifier not initialized. Call the init method on the application start up.',
      );
    }

    return this.instance;
  }

  static init(server: HttpServer): void {
    if (!!this.instance) {
      throw new Error(
        'this method must be called only once and it must be on the application start up.',
      );
    }

    this.instance = new SocketIONotifier(server);
  }

  private getSocket(player: Player): Socket {
    const socket = this.playerSocketsMap.get(player.username);
    if (!socket) {
      throw new Error('Player is not connected.');
    }

    return socket;
  }

  playerJoinedMatch(player: Player, match: Match): void {
    const socket = this.getSocket(player);
    socket.join(match.code);
    socket.to(match.code).emit('player-joined', {
      avatar: player.avatar,
      username: player.username,
    });
  }
}
