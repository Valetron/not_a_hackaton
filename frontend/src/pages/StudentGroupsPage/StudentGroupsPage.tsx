import { StyledButtonWrapper, StyledDisciplineListWrapper } from '@/pages/SubjectInfoPage/SubjectInfoPage.styled';
import { Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useStudentGroups } from '@/shared/api/hooks/useStudentGroups';
import StudentGroupAccordion from '@/components/StudentGroupAccordion/StudentGroupAccordion';
import AddStudentGroupModal from '@/components/Modal/AddStudentGroupModal/AddStudentGroupModal';
import { StyledGroupsListWrapper } from '@/pages/StudentGroupsPage/StudentGroupsPage.styled';
import { StyledQuestionBaseListWrapper } from '@/pages/QuestionBaseInfoPage/QuestionBaseInfoPage.styled';

const StudentGroupsPage = () => {
  const { universityId } = useParams();

  const { studentGroups, mutate } = useStudentGroups(Number(universityId));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box>
      <AddStudentGroupModal
        open={isOpen}
        universityId={Number(universityId)}
        mutate={mutate}
        onModalClose={() => setIsOpen(false)}
      />

      <StyledButtonWrapper>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Добавить группу студентов
        </Button>
      </StyledButtonWrapper>
      <StyledQuestionBaseListWrapper>
        {studentGroups &&
          studentGroups.length > 0 &&
          studentGroups.map((studentGroup) => <StudentGroupAccordion key={studentGroup.id} group={studentGroup} />)}
      </StyledQuestionBaseListWrapper>
    </Box>
  );
};

export default StudentGroupsPage;
