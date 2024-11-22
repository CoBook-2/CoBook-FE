import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/mock/users";
import { OcrResult } from "@/types";

// API 응답 타입 정의
type Data = {
  success: boolean;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { spaceId, ocrResult } = req.body as {
      spaceId: string;
      ocrResult: OcrResult;
    };

    console.log(`Received spaceId: ${spaceId}`);
    console.log("Received ocrResult:", ocrResult);

    // 사용자를 찾습니다. 여기서는 첫 번째 사용자만 고려합니다.
    const user = users[0];
    const space = user.participatingSpaces.find((s) => s.spaceId === spaceId);

    if (space) {
      space.ocrResults = space.ocrResults || [];
      space.ocrResults.push(ocrResult);

      console.log(`Updated space (spaceId: ${spaceId}):`, space);

      res.status(200).json({
        success: true,
        message: "OCR 결과가 성공적으로 저장되었습니다.",
      });
    } else {
      console.log(`Invalid spaceId: ${spaceId}`);
      res
        .status(400)
        .json({ success: false, message: "유효하지 않은 spaceId입니다." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
