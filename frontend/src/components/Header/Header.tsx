import { StyledHeader, StyledHeaderContainer, StyledNavbarContainer } from '@/components/Header/Header.styled';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Box } from '@mui/material';
import { useUserStore } from '@/shared/store/userStore';

const Header = () => {
  const user = useUserStore((state) => state.user);

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledNavbarContainer>
          <Sidebar />
          {user && (
            <Box sx={{ textTransform: 'uppercase' }}>
              {user.surname} {user.name} {user.patronymic}
            </Box>
          )}
        </StyledNavbarContainer>
        <Box>0xdeadf00d</Box>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

export default Header;
