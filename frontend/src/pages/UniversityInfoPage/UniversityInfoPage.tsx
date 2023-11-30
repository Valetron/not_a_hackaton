import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { getUniversityById } from '@/shared/api/fetchers/universityFetcher';
import { Box, Button, CardContent, Tab, Tabs, Typography } from '@mui/material';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { useUniversitySubjects } from '@/shared/api/hooks/useUniversitySubjects';
import AddSubjectModal from '@/components/Modal/AddSubjectModal/AddSubjectModal';
import { createSubject } from '@/shared/api/fetchers/subjectFetcher';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import ListCard from '@/components/ListCard/ListCard';
import TabPanel from '@/components/TabPanel/TabPanel';
import { LocalLibrarySharp } from '@mui/icons-material';
import { StyledButtonWrapper, StyledDisciplineListWrapper } from '@/pages/SubjectInfoPage/SubjectInfoPage.styled';
import StudentGroupsPage from '@/pages/StudentGroupsPage/StudentGroupsPage';

const UniversityInfoPage = () => {
  const { universityId } = useParams();
  const { successToast, errorToast } = useToast();
  const [universityInfo, setUniversityInfo] = useState<HackathonApi.UniversityOutputDTO>();
  const navigate = useNavigate();
  const location = useLocation();

  const { subjects, isLoading, mutate, error } = useUniversitySubjects(Number(universityId));

  const [tabValue, setTabValue] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleModalSubmit = useCallback(
    async (name?: string) => {
      try {
        const response = await createSubject(name, Number(universityId));
        await mutate([...(subjects || []), response]);
        successToast('Успешно создана сущность');
        setIsOpen(false);
      } catch {
        errorToast('Ошибка при создании сущности');
      }
    },
    [universityId],
  );

  useEffect(() => {
    const getUniversity = async () => {
      try {
        const response = await getUniversityById(Number(universityId));
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
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Университет: {universityInfo?.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {universityInfo?.description}
        </Typography>

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
                        generatePath(`${location.pathname}/subject/:id`, {
                          id: String(subject.id),
                        }),
                      )
                    }
                  />
                ))}
            </StyledDisciplineListWrapper>
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <StudentGroupsPage />
        </TabPanel>
      </CardContent>
    </Box>
  );
};

export default UniversityInfoPage;
