export interface User {
  id: number;
  user_name: string;
  email: string;
  password?: string;
  register_date?: Date;
  avatar: string;
}

export interface UserItem {
  id: number;
  user_name: string;
  avatar: string;
}
