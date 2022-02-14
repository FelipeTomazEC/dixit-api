interface PlayerInfo {
  username: string;
  avatar: string;
}

export interface JoinMatchResponse {
  matchPlayers: PlayerInfo[];
}
