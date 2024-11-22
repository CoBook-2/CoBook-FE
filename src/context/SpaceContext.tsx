import React, { createContext, useContext, useState, ReactNode } from "react";

// Context의 타입 정의
interface SpaceContextProps {
  spaceId: string | null;
  setSpaceId: (id: string) => void;
}

// 기본값 정의
const SpaceContext = createContext<SpaceContextProps | undefined>(undefined);

// Context Provider 컴포넌트
export const SpaceProvider = ({ children }: { children: ReactNode }) => {
  const [spaceId, setSpaceId] = useState<string | null>(null);

  return (
    <SpaceContext.Provider value={{ spaceId, setSpaceId }}>
      {children}
    </SpaceContext.Provider>
  );
};

// Context를 사용하는 커스텀 훅
export const useSpaceContext = () => {
  const context = useContext(SpaceContext);
  if (!context) {
    throw new Error("useSpaceContext must be used within a SpaceProvider");
  }
  return context;
};
