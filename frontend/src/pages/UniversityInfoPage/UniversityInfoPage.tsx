import { generatePath, useNavigate, useParams } from 'react-router-dom';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { getUniversityById } from '@/shared/api/fetchers/universityFetcher';
import { Box, Button, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { useUniversitySubjects } from '@/shared/api/hooks/useUniversitySubjects';
import AddSubjectModal from '@/components/Modal/AddSubjectModal/AddSubjectModal';
import { createSubject } from '@/shared/api/fetchers/subjectFetcher';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { StyledWrapper } from '@/pages/UniversityInfoPage/UniversityInfoPage.styled';
import ListCard from '@/components/ListCard/ListCard';
import TabPanel from '@/components/TabPanel/TabPanel';
import { LocalLibrarySharp } from '@mui/icons-material';
import { StyledButtonWrapper, StyledDisciplineListWrapper } from '@/pages/SubjectInfoPage/SubjectInfoPage.styled';

const UniversityInfoPage = () => {
  const { id } = useParams();
  const { successToast, errorToast } = useToast();
  const [universityInfo, setUniversityInfo] = useState<HackathonApi.UniversityOutputDTO>();
  const navigate = useNavigate();

  const { subjects, isLoading, mutate, error } = useUniversitySubjects(Number(id));

  const [tabValue, setTabValue] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleModalSubmit = useCallback(
    async (name?: string) => {
      try {
        const response = await createSubject(name, Number(id));
        await mutate([...(subjects || []), response]);
        successToast('Успешно создана сущность');
        setIsOpen(false);
      } catch {
        errorToast('Ошибка при создании сущности');
      }
    },
    [id],
  );

  const handleEditModalSubmit = useCallback(
    async (name?: string) => {
      try {
        const response = await createSubject(name, Number(id));
        await mutate([...(subjects || []), response]);
        successToast('Успешно редактирована сущность');
        setIsEditOpen(false);
      } catch {
        errorToast('Ошибка при редактировании сущности');
      }
    },
    [id],
  );

  useEffect(() => {
    const getUniversity = async () => {
      try {
        const response = await getUniversityById(Number(id));
        setUniversityInfo(response);
      } catch {
        //
      }
    };
    getUniversity();
  }, []);

  return (
    <Box>
      {isOpen && (
        <AddSubjectModal
          title="Добавление дисциплины"
          open={isOpen}
          onModalSubmit={handleModalSubmit}
          onModalClose={() => setIsOpen(false)}
        />
      )}
      {/*{isEditOpen && (*/}
      {/*  <AddSubjectModal*/}
      {/*    title="Редактировать дисциплину"*/}
      {/*    open={isEditOpen}*/}
      {/*    onModalSubmit={() => {}}*/}
      {/*    onModalClose={() => setIsEditOpen(false)}*/}
      {/*  />*/}
      {/*)}*/}
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Университет: {universityInfo?.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {universityInfo?.description}
        </Typography>
        {/*<Typography variant="body2" color="textSecondary">*/}
        {/*  Преподавателей: {universityData.teachersCount} | Студентов: {universityData.studentsCount || 0}*/}
        {/*</Typography>*/}

        <Tabs value={tabValue} onChange={handleChange} aria-label="Университет">
          <Tab label="Дисциплины" id="tab-1" />
          <Tab label="Группы студентов" id="tab-2" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box>
            <StyledButtonWrapper>
              <Button variant="contained" onClick={() => setIsOpen(true)}>
                Добавить дисциплину
              </Button>
            </StyledButtonWrapper>
            <StyledDisciplineListWrapper>
              {subjects &&
                subjects.length > 0 &&
                subjects.map((subject) => (
                  <ListCard
                    key={subject.id}
                    item={subject}
                    icon={<LocalLibrarySharp color="primary" fontSize="large" />}
                    onClick={() =>
                      navigate(
                        generatePath('/subject/:id', {
                          id: String(subject.id),
                        }),
                      )
                    }
                  />
                ))}
            </StyledDisciplineListWrapper>
          </Box>
        </TabPanel>
      </CardContent>
    </Box>
  );
};

export default UniversityInfoPage;
