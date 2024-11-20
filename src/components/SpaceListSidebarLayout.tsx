import React, { ReactNode, useState } from "react";
import style from "./SpaceListSidebarLayout.module.css";
import Link from "next/link";
import JoinSpaceLayout from "./JoinSpaceLayout";

interface Space {
  title: string;
  tags: string[];
}

export default function SpaceListSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [spaces] = useState<Space[]>([
    {
      title: "2024 경기대 학생회",
      tags: ["경기대", "2024", "학생회", "거북이"],
    },
    {
      title: "2024 강서 FC",
      tags: ["강서구", "축구", "동호회", "우장산"],
    },
    {
      title: "안산 산악 동호회",
      tags: ["안산", "산악회", "동호회"],
    },
  ]);

  return (
    <div className={style.layout}>
      <div className={style.sidebar}>
        <Link href="/spaceManagement">
          <img
            src="/CoBook Logo(nonBackground).png"
            alt="CoBook Logo"
            style={{ maxWidth: "100px" }}
          />
        </Link>
        <div>
          <div className={style.spaceTitle}>참여 스페이스 목록</div>
          <div>
            <JoinSpaceLayout spaces={spaces} />
          </div>
        </div>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}
