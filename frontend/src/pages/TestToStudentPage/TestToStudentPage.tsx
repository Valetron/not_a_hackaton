import { StyledTabWrapper } from '@/pages/TestToStudentPage/TestToStudentPage.styled';
import SudentsAccordionList from '@/components/StudentsAccordion/SudentsAccordionList';
import { useState } from 'react';

const TestToStudentPage = () => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  return (
    <StyledTabWrapper>
      <SudentsAccordionList />
    </StyledTabWrapper>
  );
};

export default TestToStudentPage;
