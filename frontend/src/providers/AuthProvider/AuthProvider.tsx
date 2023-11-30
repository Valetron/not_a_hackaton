import { ReactNode, useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/shared/store/userStore';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  //
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const navigateUser = async () => {
      if (!user) {
        return;
      }

      if (user.role === 'TEACHER') {
        navigate(
          generatePath('university/:universityId', {
            universityId: String(user.universityId),
          }),
        );
      }

      if (user.role === 'SUPERADMIN') {
        navigate('/superadmin');
      }
    };

    void navigateUser();
  }, [user]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
};

export default AuthProvider;
