import { FC, useState } from 'react';
import { useTestResult } from '@/shared/api/hooks/useTestResult';
import { Box } from '@mui/material';
import TestCard from '@/components/TestCard/TestCard';
import { StyledWrapper } from '@/pages/StudentInfoPage/ResultsTab.styled';
import CheckTestDetailsModal from '@/components/Modal/CheckTestDetailsModal/CheckTestDetailsModal';
import { HackathonApi } from '@/shared/api/HackathonApi';

interface ResultsTabProps {
  studentInfo: HackathonApi.StudentOutputDTO;
}
const ResultsTab: FC<ResultsTabProps> = ({ studentInfo }) => {
  const { testResults } = useTestResult(studentInfo.id!);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledWrapper>
      {testResults &&
        testResults.map((result) => (
          <>
            <CheckTestDetailsModal
              test={result}
              studentInfo={studentInfo}
              open={isOpen}
              title={'Просмотр теста'}
              onModalClose={() => setIsOpen(false)}
            />
            <TestCard key={result.id} testResult={result} onPress={() => setIsOpen(true)} />
          </>
        ))}
    </StyledWrapper>
  );
};

export default ResultsTab;
