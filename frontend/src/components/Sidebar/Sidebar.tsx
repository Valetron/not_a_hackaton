import { Box } from '@mui/material';
import { useState, KeyboardEvent, MouseEvent } from 'react';
import {
  DrawerNavItem,
  StyledDrawer,
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
        <StyledNav>
          <DrawerNavItem>
            <StyledLink to={'/'} onClick={() => setIsOpen(false)}>
              В хоум
            </StyledLink>
          </DrawerNavItem>
          <DrawerNavItem>
            <StyledLink to={'/superadmin'} onClick={() => setIsOpen(false)}>
              В админку
            </StyledLink>
          </DrawerNavItem>
        </StyledNav>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
