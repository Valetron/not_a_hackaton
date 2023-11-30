import { HackathonApi } from '@/shared/api/HackathonApi';
import { FC } from 'react';
import { Box } from '@mui/material';
import { TestCardStyledTitle, TestCardStyledWrapper } from '@/components/TestCard/TestCard.styled';

interface TestCardProps {
  testResult: HackathonApi.ResultTestOutputDTO;
  onPress: () => void;
}

const TestCard: FC<TestCardProps> = ({ testResult, onPress }) => {
  return (
    <TestCardStyledWrapper onClick={onPress}>
      <TestCardStyledTitle>{testResult.testName || 'Название теста'}</TestCardStyledTitle>
      <Box>Баллов: {testResult.mark}</Box>
      <Box>Пройдено: {testResult.percent}%</Box>
    </TestCardStyledWrapper>
  );
};

export default TestCard;
