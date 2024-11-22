import { NextApiRequest, NextApiResponse } from "next";
import { mockOcrResult } from "@/mock/users";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { spaceId } = req.body; // JSON.parse 제거

    if (spaceId === "1") {
      res.status(200).json(mockOcrResult);
    } else {
      res.status(400).json({ error: "잘못된 spaceId입니다." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
