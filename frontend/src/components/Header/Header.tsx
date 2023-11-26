import { StyledHeader, StyledHeaderContainer } from '@/components/Header/Header.styled';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Box } from '@mui/material';

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <Sidebar />
        <Box> 0xdeadf00d</Box>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

export default Header;
