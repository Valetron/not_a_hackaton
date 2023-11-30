import { useState, KeyboardEvent, MouseEvent, useMemo } from 'react';
import {
  DrawerNavItem,
  StyledDrawer,
  StyledDrawerContentWrapper,
  StyledHeader,
  StyledLink,
  StyledMenuIcon,
  StyledNav,
} from '@/components/Sidebar/Sidebar.styled';
import AddTeacherModal from '@/components/Modal/AddTeacherModal/AddTeacherModal';
import { useUserStore } from '@/shared/store/userStore';
import { Box } from '@mui/material';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenTeacherModal, setIsOpenTeacherModal] = useState<boolean>(false);

  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logOut);

  const mainLink = useMemo(
    () => (user && user.role === 'SUPERADMIN' ? '/superadmin' : `university/${user?.universityId}`),
    [user],
  );

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    user && (
      <>
        <StyledMenuIcon color={'inherit'} onClick={toggleDrawer(true)} />
        <StyledDrawer anchor={'left'} open={isOpen} onClose={toggleDrawer(false)}>
          <AddTeacherModal
            open={isOpenTeacherModal}
            onModalClose={() => setIsOpenTeacherModal(false)}
            title={'Добавление преподавателя'}
          />
          <StyledHeader>0xdeadf00d</StyledHeader>
          <StyledDrawerContentWrapper>
            <StyledNav>
              <DrawerNavItem>
                <StyledLink to={mainLink} onClick={() => setIsOpen(false)}>
                  На главную
                </StyledLink>
              </DrawerNavItem>
              {user.role === 'SUPERADMIN' && (
                <>
                  <DrawerNavItem>
                    <StyledLink to={'/superadmin'} onClick={() => setIsOpen(false)}>
                      Университеты
                    </StyledLink>
                  </DrawerNavItem>

                  <DrawerNavItem>
                    <StyledLink to={'/superadmin'} onClick={() => setIsOpen(false)}>
                      Регистрация администратора
                    </StyledLink>
                  </DrawerNavItem>
                  <DrawerNavItem>
                    <StyledLink
                      to={'/superadmin'}
                      onClick={() => {
                        setIsOpenTeacherModal(true);
                      }}
                    >
                      Регистрация преподавателя
                    </StyledLink>
                  </DrawerNavItem>
                </>
              )}
            </StyledNav>
            <Box>
              <DrawerNavItem>
                <StyledLink
                  to={'/login'}
                  onClick={() => {
                    logOut();
                    setIsOpen(false);
                  }}
                >
                  Выход
                </StyledLink>
              </DrawerNavItem>
            </Box>
          </StyledDrawerContentWrapper>
        </StyledDrawer>
      </>
    )
  );
};

export default Sidebar;
