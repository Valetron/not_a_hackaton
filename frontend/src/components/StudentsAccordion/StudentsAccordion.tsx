import { HackathonApi } from '@/shared/api/HackathonApi';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, Box, Checkbox } from '@mui/material';
import {
  StyledAccordionDetails,
  StyledAccordionDetailsWrapper,
  StyledAccordionSummary,
  StyledAccordionWrapper,
} from '@/components/StudentsAccordion/StudentsAccordion.styled';
import { useStudents } from '@/shared/api/hooks/useStudents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface StudentsAccordionProps {
  group: HackathonApi.StudentGroupOutputDTO;
  selectGroup: (students: HackathonApi.StudentOutputDTO[], state: boolean) => void;
  selectStudent: (student: HackathonApi.StudentOutputDTO, state: boolean) => void;
}

const StudentsAccordion: FC<StudentsAccordionProps> = ({ group, selectGroup, selectStudent }) => {
  const { studentsList, isLoading, mutate, error } = useStudents(group.id);
  const [checkedStudents, setCheckedStudents] = useState<HackathonApi.StudentOutputDTO[]>([]);

  const fetchStudentsForGroup = useCallback(async () => {
    try {
      // const response = await getStudentsByGroupId(groupId);
      // setStudents(response);
    } catch {
      //
    }
  }, [group]);

  const handleCheckGroup = (event: ChangeEvent) => {
    // @ts-expect-error - checked существует
    const checkedState = event.target.checked as boolean;

    if (!checkedState) {
      setCheckedStudents([]);
    } else {
      setCheckedStudents(studentsList!);
    }

    selectGroup(studentsList!, checkedState);
  };

  const handleCheckStudent = (event: ChangeEvent, student: HackathonApi.StudentOutputDTO) => {
    // @ts-expect-error - checked существует
    const checkedState = event.target.checked as boolean;
    console.log(checkedState);

    if (!checkedState) {
      setCheckedStudents((prev) => prev.filter((st) => st.id !== student.id));
    } else {
      setCheckedStudents((prev) => [...prev, student]);
    }

    selectStudent(student, checkedState);
  };

  useEffect(() => {}, []);

  return (
    <StyledAccordionWrapper>
      <Box
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        <Checkbox onChange={handleCheckGroup} />
      </Box>
      <Accordion title={group.name} sx={{ flex: '1' }}>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>{group.name}</StyledAccordionSummary>
        {studentsList
          ? studentsList.map((student) => (
              <StyledAccordionDetails key={student.id}>
                <Checkbox
                  onChange={(e) => handleCheckStudent(e, student)}
                  checked={!!checkedStudents.find((st) => st.id === student.id)}
                />
                {`${student.name} ${student.surname} ${student.patronymic}`}
              </StyledAccordionDetails>
            ))
          : null}
      </Accordion>
    </StyledAccordionWrapper>
  );
};

export default StudentsAccordion;
