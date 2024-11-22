export interface Space {
  name: string;
  tags: string[];
  spaceId: string;
  enterCode: string;
}

export interface User {
  id: string;
  password: string;
  participatingSpaces: Space[];
}
