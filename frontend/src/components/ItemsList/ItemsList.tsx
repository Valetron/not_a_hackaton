import { StyledListWrapper } from '@/components/ItemsList/ItemsList.styled';
import { FC } from 'react';
import ListCard from '@/components/ListCard/ListCard';

interface ItemsListProps {
  items: any;
  onCardClick?: () => void;
}

const ItemsList: FC<ItemsListProps> = ({ items, onCardClick }) => {
  return (
    <StyledListWrapper>
      {items.map((item: any) => (
        <ListCard key={item.id} item={item} onClick={() => onCardClick?.()} />
      ))}
    </StyledListWrapper>
  );
};

export default ItemsList;
