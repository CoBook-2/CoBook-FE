import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Space } from "@/types";

export default function SpaceMainHomePage() {
  const router = useRouter();
  const { spaceId } = router.query;
  const { user } = useAuth();
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    if (spaceId && typeof spaceId === "string") {
      const foundSpace = user.participatingSpaces.find(
        (s) => s.spaceId === spaceId
      );
      if (foundSpace) {
        setSpace(foundSpace);
      } else {
        setSpace(null);
      }
    }
  }, [spaceId, user, router]);

  if (!space) {
    return <div>해당 스페이스를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{space.name}</h1>
      <p>Space ID: {space.spaceId}</p>
      <p>Tags: {space.tags.join(", ")}</p>
      {/* 추가적인 스페이스 정보 표시 */}
    </div>
  );
}
