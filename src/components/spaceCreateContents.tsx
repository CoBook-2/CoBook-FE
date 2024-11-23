import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function spaceCreateContents() {
  const { user } = useAuth(); // AuthContext에서 user 가져오기

  if (!user) {
    return <p>로그인이 필요합니다.</p>; // 유저 정보가 없을 때 처리
  }

  return (
    <div>
      <h1>스페이스 생성</h1>
      <p>현재 유저: {user.id}</p>
    </div>
  );
}
