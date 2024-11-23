import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User, Space } from "@/types";

interface AuthContextType {
  user: User | null | undefined; // user의 타입에 undefined 추가
  login: (id: string, participatingSpaces: Space[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined); // 초기값을 undefined로 설정

  // 로그인 함수
  const login = (id: string, participatingSpaces: Space[]) => {
    const newUser: User = {
      id, 
      participatingSpaces,
      nickName: ""
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // 로컬 스토리지에 사용자 정보 저장
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 제거
  };

  // 앱 초기 로드 시 로컬 스토리지에서 사용자 정보 복원
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "로컬 스토리지에서 사용자 정보를 파싱하는 중 오류 발생:",
          error
        );
        localStorage.removeItem("user"); // 파싱 오류 시 로컬 스토리지에서 제거
        setUser(null);
      }
    } else {
      setUser(null); // 로컬 스토리지에 사용자 정보가 없을 경우 null로 설정
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내에서만 사용 가능합니다.");
  }
  return context;
};
