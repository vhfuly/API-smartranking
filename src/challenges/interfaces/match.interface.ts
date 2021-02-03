import { Player } from 'src/players/schemas/player.schema';

export interface Match {
  category: string;
  players: Array<Player>;
  def: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}