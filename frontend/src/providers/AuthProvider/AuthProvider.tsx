import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  //
  // const user = useUserStore((state) => state.user);
  // const loginByToken = useUserStore((state) => state.logInUsingToken);

  useEffect(() => {
    const loginByToken = async () => {
      // if (!user) {
      //   try {
      //     // const tokens = API.$get('/api/refresh');
      //     // if (!tokens) {
      //     // navigate('/login');
      //     // }
      //     // loginByToken(tokens.accessToken);
      //   } catch {
      //     // navigate('/login');
      //   }
      // }
    };

    void loginByToken();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
};

export default AuthProvider;
