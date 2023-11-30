import { HackathonApi } from '@/shared/api/HackathonApi';
import { FC } from 'react';
import { Accordion } from '@mui/material';
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionWrapper,
} from '@/components/StudentsAccordion/StudentsAccordion.styled';
import { useStudents } from '@/shared/api/hooks/useStudents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';

interface StudentGroupAccordionProps {
  group: HackathonApi.StudentGroupOutputDTO;
}

const StudentGroupAccordion: FC<StudentGroupAccordionProps> = ({ group }) => {
  const { studentsList, isLoading, mutate, error } = useStudents(group.id!);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledAccordionWrapper>
      <Accordion title={group.name} sx={{ flex: '1' }} key={group.id}>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>{group.name}</StyledAccordionSummary>
        {studentsList
          ? studentsList.map((student) => (
              <StyledAccordionDetails
                key={student.id}
                onClick={() =>
                  navigate(
                    generatePath(`${location.pathname}/student/:studentId`, {
                      studentId: String(student.id),
                    }),
                  )
                }
              >
                {`${student.name} ${student.surname} ${student.patronymic}`}
              </StyledAccordionDetails>
            ))
          : null}
      </Accordion>
    </StyledAccordionWrapper>
  );
};

export default StudentGroupAccordion;
