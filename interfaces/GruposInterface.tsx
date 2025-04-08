export interface UserCountGroup {
  id: number;
  name: string;
  avatar: string;
  sport: string;
  userNumbers: number;
  owner: number;
}
export interface Group {
  id: number;
  name: string;
  avatar: string;
  sport: string;
}
export interface AddGroupResponse {
  id: number;
  name: string;
  user_id: number;
  sport_id: number;
  avatar_id: number;
}
