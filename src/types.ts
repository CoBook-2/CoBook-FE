export interface Space {
  name: string; // users.ts에서 사용하는 속성명에 맞춰 'name'으로 수정
  tags: string[];
}

export interface User {
  id: string;
  password: string;
  participatingSpaces: Space[];
}
