import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/mock/users";
import { Space } from "@/types";

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    participatingSpaces: Space[];
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const { id, password } = req.body;

  // 사용자 검색
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "아이디가 존재하지 않습니다." });
  }

  if (user.password !== password) {
    return res
      .status(401)
      .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
  }

  // 로그인 성공
  return res.status(200).json({
    success: true,
    message: "로그인에 성공했습니다.",
    data: {
      userId: user.id,
      participatingSpaces: user.participatingSpaces, // Space 인터페이스에 맞춤
    },
  });
}
