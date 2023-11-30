import { Route, Routes } from 'react-router';

import { getRouterByRole } from '@/shared/router/router';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/shared/store/userStore';
import { useMemo } from 'react';
import { ROLES } from '@/shared/api/utils/constants';

const AppRouter = () => {
  const user = useUserStore((state) => state.user);

  const routes = useMemo(
    () => (user ? getRouterByRole[user.role as keyof typeof getRouterByRole] : getRouterByRole['UNSIGNED']),
    [user],
  );

  const navigateTo = useMemo(() => {
    if (!user) {
      return '/login';
    }

    switch (user.role) {
      case ROLES.superadmin:
        return '/superadmin';

      case ROLES.teacher:
        return `/university/${user.universityId}`;

      default:
        return '/login';
    }
  }, [user]);

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to={navigateTo} />} />
    </Routes>
  );
};

export default AppRouter;
