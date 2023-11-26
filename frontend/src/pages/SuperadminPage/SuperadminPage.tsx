// AdminPage.tsx
import React from 'react';
import { Tabs, Tab, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import UsersTab from './UsersTab';
import UniversitiesTab from './UniversitiesTab';

const StyledAdminPageContainer = styled('div')`
  padding: 20px;
  background: ${({ theme }) => theme.palette.background.page};
`;

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledTabs = styled(Tabs)`
  '& .MuiTab-root': {
    color: ${({ theme }) => theme.palette.primary.main};
  },
`;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
    {value === index && <Box p={'16px'}>{children}</Box>}
  </div>
);

const AdminPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledAdminPageContainer>
      <StyledTypography variant="h4" gutterBottom>
        Университеты
      </StyledTypography>

      <UniversitiesTab />
    </StyledAdminPageContainer>
  );
};

export default AdminPage;
