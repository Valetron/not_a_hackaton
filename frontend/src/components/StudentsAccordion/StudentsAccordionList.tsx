import { HackathonApi } from '@/shared/api/HackathonApi';
import { FC } from 'react';
import StudentsAccordion from '@/components/StudentsAccordion/StudentsAccordion';

interface StudentsAccordionList {
  groups: HackathonApi.StudentGroupOutputDTO[];
  selectGroup: (students: HackathonApi.StudentOutputDTO[], state: boolean) => void;
  selectStudent: (student: HackathonApi.StudentOutputDTO, state: boolean) => void;
}

const StudentsAccordionList: FC<StudentsAccordionList> = ({ groups, selectGroup, selectStudent }) => {
  return groups.length > 0
    ? groups.map((group) => (
        <StudentsAccordion key={group.id} group={group} selectGroup={selectGroup} selectStudent={selectStudent} />
      ))
    : null;
};

export default StudentsAccordionList;
