import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/mock/users";
import { OcrResult } from "@/types";

type Data = {
  success: boolean;
  ocrResults?: OcrResult[];
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { spaceId } = req.query;

    if (!spaceId || typeof spaceId !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "spaceId가 제공되지 않았습니다." });
    }

    // 첫 번째 사용자로 가정
    const user = users[0];
    const space = user.participatingSpaces.find((s) => s.spaceId === spaceId);

    if (space) {
      return res
        .status(200)
        .json({ success: true, ocrResults: space.ocrResults });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "유효하지 않은 spaceId입니다." });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
}
