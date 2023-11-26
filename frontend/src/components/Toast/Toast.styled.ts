import { Alert, styled } from '@mui/material';

export const StyledAlert = styled(Alert)`
  padding: 14px 13px 14px 18px;
  font-weight: 500;

  &.MuiAlert-standardSuccess {
    background-color: ${(props) => props.theme.palette.success.medium};
    color: ${(props) => props.theme.palette.success.dark};
    .MuiAlert-icon {
      color: ${(props) => props.theme.palette.success.dark};
    }
  }
`;
