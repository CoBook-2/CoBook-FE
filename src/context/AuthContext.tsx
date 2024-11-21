import { createContext, useContext, useState, ReactNode } from "react";

interface Space {
  name: string;
  tags: string[];
}

interface User {
  id: string;
  participatingSpaces: Space[];
}

interface AuthContextType {
  user: User | null;
  login: (id: string, participatingSpaces: Space[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (id: string, participatingSpaces: Space[]) => {
    console.log("로그인 성공:", id, participatingSpaces); // 디버깅 로그
    setUser({ id, participatingSpaces });
    // 필요시 로컬 스토리지에 사용자 정보 저장
    // localStorage.setItem('user', JSON.stringify({ id, participatingSpaces }));
  };

  const logout = () => {
    console.log("로그아웃"); // 디버깅 로그
    setUser(null);
    // 필요시 로컬 스토리지에서 사용자 정보 제거
    // localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
