import { ServerUser, OcrResult, Category } from "@/types";

export const categories: Category[] = ["식비", "교통비", "인건비", "기타"];

export const mockOcrResult: OcrResult = {
  purchase: "스타벅스",
  address: "서울특별시 강남구 테헤란로",
  date: "2024-11-22",
  author: "유저A",
  items: [
    { name: "아메리카노", quantity: 2, amount: 8000, category: "" },
    { name: "카페라떼", quantity: 1, amount: 4500, category: "" },
  ],
  totalAmount: 12500, // 총금액 계산
};

export const users: ServerUser[] = [
  {
    nickName: "멋쟁이신사",
    id: "jjy092801",
    password: "0928",
    profileImage: "",
    participatingSpaces: [
      {
        name: "2024 경기대 학생회",
        tags: ["경기대", "2024", "학생회", "거북이"],
        spaceId: "1",
        enterCode: "",
        ocrResults: [mockOcrResult], // 초기 데이터
        receivedImages: [], // 추가
      },
      {
        name: "2024 강서 FC",
        tags: ["강서구", "축구", "동호회", "우장산"],
        spaceId: "2",
        enterCode: "1234",
        ocrResults: [], // 초기 빈 배열
        receivedImages: [], // 추가
      },
      {
        name: "안산 산악 동호회",
        tags: ["안산", "산악회", "동호회"],
        spaceId: "3",
        enterCode: "",
        ocrResults: [], // 초기 빈 배열
        receivedImages: [], // 추가
      },
    ],
  },
  {
    nickName: "정지용",
    id: "jjy1234",
    password: "1234",
    profileImage: "", // 프로필 이미지
    participatingSpaces: [
      {
        name: "2024 경기대 학생회",
        tags: ["경기대", "2024", "학생회", "거북이"],
        spaceId: "1",
        enterCode: "",
        ocrResults: [],
        receivedImages: [], // 추가
      },
    ],
  },
  {
    nickName: "유윤정",
    id: "yyj0310",
    password: "0310",
    profileImage: "",
    participatingSpaces: [
      {
        name: "2024 경기대 학생회",
        tags: ["경기대", "2024", "학생회", "거북이"],
        spaceId: "1",
        enterCode: "",
        ocrResults: [],
        receivedImages: [], // 추가
      },
    ],
  },
  {
    nickName: "조참솔",
    id: "cho1234",
    password: "1234",
    profileImage: "",
    participatingSpaces: [
      {
        name: "2024 경기대 학생회",
        tags: ["경기대", "2024", "학생회", "거북이"],
        spaceId: "1",
        enterCode: "",
        ocrResults: [],
        receivedImages: [], // 추가
      },
    ],
  },
];
