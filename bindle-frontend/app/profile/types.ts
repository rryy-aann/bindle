export type User = {
  id: number;
  email: string;
  username: string;
  displayName: string;
  xp: number;
  level: number;
  coinBalance: number;
  avatarUrl: string; // not optional anymore
};
