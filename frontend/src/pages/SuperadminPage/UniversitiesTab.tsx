import React, { useCallback, useState } from 'react';
import { Button, Box } from '@mui/material';
import AddUniversityModal from '@/components/Modal/AddUniversityModal/AddUniversityModal';
import { createUniversity } from '@/shared/api/fetchers/universityFetcher';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { generatePath, useNavigate } from 'react-router-dom';
import { useUniversitiesList } from '@/shared/api/hooks/useUniversitiesList';
import { StyledListWrapper } from '@/components/ItemsList/ItemsList.styled';
import { StyledTableContainer } from '@/pages/UniversityInfoPage/UniversityInfoPage.styled';
import ListCard from '@/components/ListCard/ListCard';
import { StyledButtonWrapper, StyledDisciplineListWrapper } from '@/pages/SubjectInfoPage/SubjectInfoPage.styled';
import CheckTestDetailsModal from '@/components/Modal/CheckTestDetailsModal/CheckTestDetailsModal';

const UniversitiesTab: React.FC = () => {
  const { universitiesList, isLoading, mutate, error } = useUniversitiesList();
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const onSuccessModalCreate = useCallback(
    async (data: HackathonApi.UniversityInputDTO) => {
      try {
        const createdUniversity = await createUniversity(data);
        await mutate([...(universitiesList || []), createdUniversity]);

        successToast('Успешно создано');
        setIsOpen(false);
      } catch {
        errorToast('Неудачно создал универ');
      }
    },
    [successToast, errorToast, createUniversity, mutate],
  );

  return (
    <Box>
      <StyledButtonWrapper>
        <Button variant={'contained'} onClick={handleOpenModal}>
          Добавить университет
        </Button>
      </StyledButtonWrapper>
      {isOpen && <AddUniversityModal open onModalClose={handleCloseModal} onModalSubmit={onSuccessModalCreate} />}
      {!error && !isLoading && universitiesList && (
        <StyledDisciplineListWrapper>
          {universitiesList.map((university) => (
            <ListCard
              key={university.id}
              item={university}
              onClick={() =>
                navigate(
                  generatePath('/university/:id', {
                    id: String(university.id),
                  }),
                )
              }
            />
          ))}
          {/*<CheckTestDetailsModal*/}
          {/*  testData={{*/}
          {/*    testName: 'Название теста',*/}
          {/*  }}*/}
          {/*  open={true}*/}
          {/*  title={'Просмотр теста'}*/}
          {/*  onModalClose={() => setIsOpen(false)}*/}
          {/*/>*/}
        </StyledDisciplineListWrapper>
      )}
    </Box>
  );
};

export default UniversitiesTab;

// <Link
//   to={}
// >
