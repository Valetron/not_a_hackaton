import { styled } from '@mui/system';
import { MenuSharp } from '@mui/icons-material';
import { Box, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledNav = styled('nav')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const StyledHeader = styled(Box)`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${({ theme }) => theme.palette.text.white};
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    overflow: hidden;
    width: 300px;
    max-width: 100vw;
  }
`;

export const StyledDrawerContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledMenuIcon = styled(MenuSharp)`
  font-size: 36px;

  &:hover {
    cursor: pointer;
  }
`;

export const DrawerNavItem = styled(Box)`
  width: 270px;
  height: 48px;
  border-radius: 16px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  text-decoration: none;
`;
