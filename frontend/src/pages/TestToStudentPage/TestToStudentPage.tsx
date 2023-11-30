import { StyledListWrapper, StyledSelect, StyledTabWrapper } from '@/pages/TestToStudentPage/TestToStudentPage.styled';
import StudentsAccordionList from '@/components/StudentsAccordion/StudentsAccordionList';
import { FC, useCallback, useState } from 'react';
import { useStudentGroups } from '@/shared/api/hooks/useStudentGroups';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { Box, Button, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTests } from '@/shared/api/hooks/useTests';
import { StyledButtonWrapper } from '@/pages/TestToStudentPage/TestToStudentPage.styled';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { activateTest } from '@/shared/api/fetchers/testFetcher';

interface TestToStudentPageProps {
  universityId: number;
  subjectId: number;
}

const TestToStudentPage: FC<TestToStudentPageProps> = ({ universityId, subjectId }) => {
  const { successToast, errorToast } = useToast();
  const [selectedStudents, setSelectedStudents] = useState<HackathonApi.StudentOutputDTO[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const { studentGroups, isLoading, mutate, error } = useStudentGroups(universityId);
  const { testsList, isLoading: testLoading, mutate: testMutate, error: testError } = useTests(subjectId);

  const handleClickGroupCheckbox = useCallback((students: HackathonApi.StudentOutputDTO[], state: boolean) => {
    if (state) {
      setSelectedStudents((prev) => [...prev, ...students]);
    } else {
      const studentsIds = students.map((st) => st.id);
      setSelectedStudents((prev) => prev.filter((student) => !studentsIds.includes(student.id!)));
    }
  }, []);

  const handleClickStudentCheckbox = useCallback((student: HackathonApi.StudentOutputDTO, state: boolean) => {
    if (state) {
      setSelectedStudents((prev) => [...prev, student]);
    } else {
      setSelectedStudents((prev) => prev.filter((st) => st.id !== student.id));
    }
  }, []);

  const handleChangeSelectedTest = useCallback((e: SelectChangeEvent<unknown>) => {
    const testId = e.target.value as number;
    setSelectedTestId(testId);
  }, []);

  const handleSendTest = useCallback(async () => {
    if (!selectedStudents.length) {
      errorToast('Не выбраны студенты');
      return;
    }

    if (selectedTestId === null) {
      errorToast('Не выбран тест');
      return;
    }

    try {
      const studentsIds = selectedStudents.map((st) => st.id) as number[];
      await activateTest(studentsIds, selectedTestId);
      setSelectedStudents([]);
      successToast('Тест успешно назначен');
    } catch {
      errorToast('Произошла ошибка при назначении теста');
    }
  }, [selectedStudents, selectedTestId]);

  return studentGroups ? (
    <StyledTabWrapper>
      <Box>
        <Box
          sx={{
            marginBottom: '16px',
            fontSize: '18px',
          }}
        >
          Выбрать тест:
        </Box>
        {testsList && (
          <StyledSelect onChange={handleChangeSelectedTest}>
            {testsList.map((test) => (
              <MenuItem value={test.id}>{test.name}</MenuItem>
            ))}
          </StyledSelect>
        )}
      </Box>
      <Box sx={{ fontSize: '19px' }}>Выберите группы/студентов для назначения теста:</Box>
      <StyledListWrapper>
        <StudentsAccordionList
          groups={studentGroups}
          selectGroup={handleClickGroupCheckbox}
          selectStudent={handleClickStudentCheckbox}
        />
      </StyledListWrapper>

      <StyledButtonWrapper>
        <Button onClick={handleSendTest} variant="contained">
          Отправить тест
        </Button>
      </StyledButtonWrapper>
    </StyledTabWrapper>
  ) : (
    <StyledTabWrapper>
      <>Error</>
    </StyledTabWrapper>
  );
};

export default TestToStudentPage;
