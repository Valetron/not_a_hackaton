import { HackathonApi } from '@/shared/api/HackathonApi';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from '@mui/material';

interface StudentsAccordionProps {
  group: HackathonApi.StudentGroupOutputDTO;
  onGroupClick: (students: number[], checked: boolean) => void;
  onStudentClick: (student: number) => void;
}

const StudentsAccordion: FC<StudentsAccordionProps> = ({ group, onGroupClick, onStudentClick }) => {
  const [students, setStudents] = useState<HackathonApi.StudentOutputDTO[]>([]);

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
    onGroupClick(students, checked);
  };

  const handleCheckStudent = (event: ChangeEvent) => {
    // @ts-expect-error - checked существует
    const checkedState = event.target.checked as boolean;
    // onStudentClick(studentId, checked)
  };

  useEffect(() => {
    fetchStudentsForGroup();
  }, []);

  return (
    <Accordion>
      <AccordionSummary>
        {group.name}
        <Checkbox />
      </AccordionSummary>
      {students.map((student) => (
        <AccordionDetails
          key={student.id}
        >{`${student.surname} ${student.name} ${student.patronymic}`}</AccordionDetails>
      ))}
    </Accordion>
  );
};

export default StudentsAccordion;
