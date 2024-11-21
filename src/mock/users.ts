interface Space {
  name: string;
  tags: string[];
}

interface User {
  id: string;
  password: string;
  participatingSpaces: Space[];
}

export const users: User[] = [
  {
    id: "jjy092801",
    password: "0928",
    participatingSpaces: [
      {
        name: "2024 경기대 학생회",
        tags: ["#경기대", "#2024", "#학생회", "#거북이"],
      },
      {
        name: "2024 강서 FC",
        tags: ["#강서구", "#축구", "#동호회", "#우장산"],
      },
      {
        name: "안산 산악 동호회",
        tags: ["#안산", "#산악회", "#동호회"],
      },
    ],
  },
  // 추가 사용자 데이터를 여기에 추가할 수 있습니다.
];