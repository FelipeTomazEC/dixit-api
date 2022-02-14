import { Match } from '@entities/match';
import { Player } from '@entities/player';
import { Notifier } from '@use-cases/common-dependencies/notifier.interface';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

export class SocketIONotifier implements Notifier {
  private static instance: SocketIONotifier | null = null;

  private readonly io: Server;

  private readonly playerSocketsMap: Map<string, Socket>;

  private constructor() {
    const server = createServer();
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

    const WS_PORT = process.env.WS_PORT ?? 5000;
    server.listen(WS_PORT, () =>
      console.log(`Socket listening on port ${WS_PORT}.`),
    );
  }

  static getInstance(): SocketIONotifier {
    if (!this.instance) {
      this.instance = new SocketIONotifier();
    }

    return this.instance;
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
