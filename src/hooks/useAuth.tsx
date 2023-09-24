import {
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

interface UserInput {
  accessToken: string;
  refreshToken: string;
}

type ContextProps = {
  isAuth: boolean;
  login: (UserInput: UserInput) => boolean;
  logout: () => void;
};

type ProviderProps = {};

const authContext = createContext<ContextProps>({
  isAuth: false,
  login: () => false,
  logout: () => {},
});

function AuthValue() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const login = ({ accessToken, refreshToken }: UserInput): boolean => {
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);
    setIsAuth(true);
    return true;
  };

  const logout = (): void => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setIsAuth(false);
  };

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    setIsAuth(!!accessToken);
  }, []);

  return {
    isAuth,
    login,
    logout,
  } as const;
}

export function AuthProvider({ children }: PropsWithChildren<ProviderProps>) {
  return (
    <authContext.Provider value={AuthValue()}>{children}</authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
