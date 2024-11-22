import { ServerUser } from "@/types";

export const users: ServerUser[] = [
  {
    id: "jjy092801",
    password: "0928",
    participatingSpaces: [
      {
        name: "2024 경기대 학생회",
        tags: ["#경기대", "#2024", "#학생회", "#거북이"],
        spaceId: "1",
        enterCode: "",
      },
      {
        name: "2024 강서 FC",
        tags: ["#강서구", "#축구", "#동호회", "#우장산"],
        spaceId: "2",
        enterCode: "1234",
      },
      {
        name: "안산 산악 동호회",
        tags: ["#안산", "#산악회", "#동호회"],
        spaceId: "3",
        enterCode: "",
      },
    ],
  },
  // 추가 사용자 데이터를 여기에 추가할 수 있습니다.
];
