import { generatePath, useNavigate, useParams } from 'react-router-dom';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { getUniversityById } from '@/shared/api/fetchers/universityFetcher';
import { Button, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { useUniversitySubjects } from '@/shared/api/hooks/useUniversitySubjects';
import AddSubjectModal from '@/components/Modal/AddSubjectModal/AddSubjectModal';
import { createSubject } from '@/shared/api/fetchers/subjectFetcher';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { StyledWrapper } from '@/pages/UniversityInfoPage/UniversityInfoPage.styled';
import ListCard from '@/components/ListCard/ListCard';
import TabPanel from '@/components/TabPanel/TabPanel';
import { LocalLibrarySharp } from '@mui/icons-material';

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
    <Card>
      {isOpen && (
        <AddSubjectModal open={isOpen} onModalSubmit={handleModalSubmit} onModalClose={() => setIsOpen(false)} />
      )}
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
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Добавить дисциплину
          </Button>
          {subjects && subjects.length > 0 && (
            <StyledWrapper>
              {subjects.map((subject) => (
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
            </StyledWrapper>
          )}
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default UniversityInfoPage;
