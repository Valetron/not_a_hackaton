import {
  StyledCardWrapper,
  StyledDescription,
  StyledEditButton,
  StyledIconBox,
  StyledUniversityContentWrapper,
} from '@/components/ListCard/ListCard.styled';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp';
import { Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { EditSharp } from '@mui/icons-material';

interface ListCardProps {
  item: any;
  onClick: () => void;
  icon?: ReactNode;
}

const ListCard: FC<ListCardProps> = ({ item, onClick, icon }) => {
  return (
    <StyledCardWrapper onClick={onClick}>
      <StyledIconBox>{icon || <AccountBalanceSharpIcon color="primary" fontSize="large" />}</StyledIconBox>
      <StyledUniversityContentWrapper>
        <Typography fontSize="32px">{item?.name || 'Нет имени'}</Typography>
        <StyledDescription>
          {item?.description ||
            'Нет описанияфффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффф'}
        </StyledDescription>
      </StyledUniversityContentWrapper>
    </StyledCardWrapper>
  );
};

export default ListCard;
