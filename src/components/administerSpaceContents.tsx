import React, { useContext } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSpaceContext } from "@/context/SpaceContext"; // SpaceContext에서 space 정보 가져오기

export default function administerSpaceContents() {
    const { user } = useAuth(); // AuthContext에서 user 가져오기
    const { spaceId} = useSpaceContext(); // spaceName도 가져오기
  
    if (!user) {
      return <p>로그인이 필요합니다.</p>; // 유저 정보가 없을 때 처리
    }
  
    if (!spaceId) {
      return <p>스페이스 정보를 불러오는 중입니다...</p>; // 스페이스 정보가 없을 때 처리
    }
  
    return (
      <div>
        <h1>스페이스 관리</h1>
        <p><strong>스페이스 ID:</strong> {spaceId}</p>
        <p><strong>현재 사용자 ID:</strong> {user.id}</p>
      </div>
    );
  }