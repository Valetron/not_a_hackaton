import { HackathonApi } from '@/shared/api/HackathonApi';
import { Dispatch, FC, SetStateAction } from 'react';
import StudentsAccordion from '@/components/StudentsAccordion/StudentsAccordion';

interface SudentsAccordionListProps {
  groups: HackathonApi.StudentGroupOutputDTO[];
  setSelectedStudents: Dispatch<SetStateAction<number[]>>;
}

const SudentsAccordionList: FC<SudentsAccordionListProps> = ({ groups, setSelectedStudents }) => {
  const handleClickGroupCheckbox = (state: boolean) => {
    const sth = [1, 2, 3];

    if (state) {
      setSelectedStudents((prev) => [...prev]);
    } else {
      setSelectedStudents((prev) => prev.filter((id) => sth.includes(id)));
    }
  };

  return groups.length > 0 ? groups.map((group) => <StudentsAccordion key={group.id} group={group} />) : null;
};

export default SudentsAccordionList;
