import { styled } from '@mui/system';
import { MenuSharp } from '@mui/icons-material';
import { Box, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledNav = styled('nav')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    padding: 16px;
    width: 300px;
    max-width: 100vw;
  }
`;

export const StyledMenuIcon = styled(MenuSharp)`
  font-size: 36px;

  &:hover {
    cursor: pointer;
  }
`;

export const DrawerNavItem = styled(Box)`
  width: 270px;
  height: 36px;
  border-radius: 16px;
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
