export interface Space {
  name: string;
  tags: string[];
  spaceId: string;
  enterCode?: string;
}

// 클라이언트용 User 인터페이스 (password 없음)
export interface User {
  id: string;
  participatingSpaces: Space[];
}

// 서버용 User 인터페이스 (password 포함)
export interface ServerUser extends User {
  password: string;
}