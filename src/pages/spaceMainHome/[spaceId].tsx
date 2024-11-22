import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Space } from "@/types";
import { users } from "@/mock/users"; // mock 데이터 가져오기

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
      const allSpaces = users.flatMap((u) => u.participatingSpaces);
      const foundSpace = allSpaces.find((s) => s.spaceId === spaceId);
      setSpace(foundSpace || null);
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
      <p>Enter Code: {space.enterCode}</p>
    </div>
  );
}
