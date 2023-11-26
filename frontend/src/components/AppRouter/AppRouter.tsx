import { Route, Routes } from 'react-router';

import { router } from '@/shared/router/router';
import { Navigate } from 'react-router-dom';

const AppRouter = () => {
  // @TODO: делать проверку на юзера и редиректить если че))
  // const user = useUserStore((state) => state.user);

  return (
    <Routes>
      {router.map((item) => (
        <Route key={item.path} path={item.path} element={item.element} />
      ))}
      <Route path="*" element={<Navigate to="/superadmin" />} />
    </Routes>
  );
};

export default AppRouter;
