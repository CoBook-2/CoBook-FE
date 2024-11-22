import { NextApiRequest, NextApiResponse } from "next";
import { mockOcrResult } from "@/mock/users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { body } = req;

    // 현재는 모든 요청에 대해 mock 데이터를 반환
    // 추후 "body" 값을 space별로 구분하여 OCR 결과를 다르게 반환하도록 수정 필요
    if (body === "1") {
      res.status(200).json(mockOcrResult);
    } else {
      res.status(400).json({ error: "잘못된 요청입니다." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}