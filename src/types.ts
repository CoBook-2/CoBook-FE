export type Category = "식비" | "교통비" | "인건비" | "기타";

export interface Space {
  name: string;
  tags: string[];
  spaceId: string;
  enterCode?: string;
  ocrResults?: OcrResult[];
}

// 클라이언트용 User 인터페이스 (password 없음)
export interface User {
  nickName: string;
  id: string;
  participatingSpaces: Space[];
}

// 서버용 User 인터페이스 (password 포함)
export interface ServerUser extends User {
  password: string;
}

export interface OcrResultItem {
  name: string; // 상품명
  quantity: number; // 수량
  amount: number; // 금액
  category: Category | ""; // 카테고리 (초기값은 빈 문자열)
}

export interface OcrResult {
  purchase: string; // 구매처
  address: string; // 주소
  date: string; // 거래 일시
  author: string; // 작성자
  items: OcrResultItem[]; // 항목 목록
  totalAmount: number; // 총금액
}
