import { Box } from '@mui/material';
import { useState, KeyboardEvent, MouseEvent } from 'react';
import {
  DrawerNavItem,
  StyledDrawer,
  StyledDrawerContentWrapper,
  StyledHeader,
  StyledLink,
  StyledMenuIcon,
  StyledNav,
} from '@/components/Sidebar/Sidebar.styled';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <>
      <StyledMenuIcon color={'inherit'} onClick={toggleDrawer(true)} />
      <StyledDrawer anchor={'left'} open={isOpen} onClose={toggleDrawer(false)}>
        <StyledDrawerContentWrapper>
          <StyledHeader>0xdeadf00d</StyledHeader>
          <StyledNav>
            <DrawerNavItem>
              <StyledLink to={'/'} onClick={() => setIsOpen(false)}>
                В хоум
              </StyledLink>
            </DrawerNavItem>
            <DrawerNavItem>
              <StyledLink to={'/superadmin'} onClick={() => setIsOpen(false)}>
                Университеты
              </StyledLink>
            </DrawerNavItem>
            <DrawerNavItem>
              <StyledLink to={'/superadmin'} onClick={() => setIsOpen(false)}>
                Регистрация администрация
              </StyledLink>
            </DrawerNavItem>
            <DrawerNavItem>
              <StyledLink to={'/superadmin'} onClick={() => setIsOpen(false)}>
                Регистрация преподавателя
              </StyledLink>
            </DrawerNavItem>
          </StyledNav>
        </StyledDrawerContentWrapper>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
