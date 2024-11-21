export interface Space {
  name: string;
  tags: string[];
  spaceId: string; // spaceId 속성 추가
  enterCode: string; // 참가 코드 속성도 포함
}

export interface User {
  id: string;
  password: string;
  participatingSpaces: Space[];
}
