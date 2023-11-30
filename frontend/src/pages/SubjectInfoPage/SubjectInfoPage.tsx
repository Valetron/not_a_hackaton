import { Box, Button, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '@/components/TabPanel/TabPanel';
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { getSubjectInfoById } from '@/shared/api/fetchers/subjectFetcher';
import AddQuestionBaseModal from '@/components/Modal/AddQuestionBaseModal/AddQuestionBaseModal';
import { createQuestionBase } from '@/shared/api/fetchers/questionBaseFetcher';
import { useQuestionsBase } from '@/shared/api/hooks/useQuestionsBase';
import ListCard from '@/components/ListCard/ListCard';
import { StyledWrapper } from '@/pages/UniversityInfoPage/UniversityInfoPage.styled';
import { StorageSharp } from '@mui/icons-material';
import {
  StyledButtonWrapper,
  StyledCreationBox,
  StyledCreationQuestions,
  StyledDisciplineListWrapper,
  StyledPageContentWrapper,
  StyledQuestionBox,
  StyledQuestionsList,
} from '@/pages/SubjectInfoPage/SubjectInfoPage.styled';
import TestAccordionConstructor from '@/components/TestAccordionConstructor/TestAccordionConstructor';
import CreateTestModal from '@/components/Modal/CreateTestModal/CreateTestModal';
import { addQuestionsToTest, createTest } from '@/shared/api/fetchers/testFetcher';
import StudentsAccordionList from '@/components/StudentsAccordion/StudentsAccordionList';
import TestToStudentPage from '@/pages/TestToStudentPage/TestToStudentPage';

const SubjectInfoPage = () => {
  const { universityId, subjectId } = useParams();
  const { successToast, errorToast } = useToast();
  const { questionsBase, isLoading, mutate, error } = useQuestionsBase(Number(subjectId));
  const navigate = useNavigate();
  const location = useLocation();

  const [subjectInfo, setSubjectInfo] = useState<HackathonApi.SubjectOutputDTO>();
  const [selectedQuestions, setSelectedQuestions] = useState<HackathonApi.QuestionOutputDTO[]>([]);

  const [tabValue, setTabValue] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isOpenTestCreationModal, setIsOpenTestCreationModal] = useState<boolean>(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleModalSubmit = useCallback(
    async (name?: string) => {
      try {
        const createdQuestionBase = await createQuestionBase(name, Number(subjectId));
        await mutate([...(questionsBase || []), createdQuestionBase]);
        successToast('Успешно создано');
        setIsOpen(false);
      } catch {
        errorToast('Ошибка');
      }
    },
    [errorToast, subjectId, mutate, questionsBase, successToast],
  );

  const handleCreateTestModalSubmit = useCallback(
    async (data: HackathonApi.TestInputDTO) => {
      try {
        const createdTest = await createTest(data, Number(subjectId));

        const addedQuestions = selectedQuestions.map((question) => question.id);
        await addQuestionsToTest(addedQuestions as number[], createdTest.id!);

        successToast('Тест создан');
        setIsOpenTestCreationModal(false);
        setSelectedQuestions([]);
      } catch {
        errorToast('Ошибка при создании теста');
      }
    },
    [subjectId, selectedQuestions, successToast, errorToast],
  );

  useEffect(() => {
    const fetchSubjectInfo = async () => {
      try {
        const subject = await getSubjectInfoById(Number(subjectId));
        setSubjectInfo(subject);
      } catch {
        //
      }
    };
    fetchSubjectInfo();
  }, [subjectId]);

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  return (
    <Box>
      {isOpen && (
        <AddQuestionBaseModal open={isOpen} onModalSubmit={handleModalSubmit} onModalClose={() => setIsOpen(false)} />
      )}
      <StyledPageContentWrapper>
        <Typography variant="h4" gutterBottom>
          Дисциплина: {subjectInfo?.name}
        </Typography>

        <Button variant="contained">Редактировать</Button>

        <Tabs value={tabValue} onChange={handleChange} aria-label="Университет">
          <Tab label="Базы вопросов" id="tab-1" />
          <Tab label="Создание теста" id="tab-2" />
          <Tab label="Назначение теста" id="tab-3" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box>
            <StyledButtonWrapper>
              <Button variant="contained" onClick={() => setIsOpen(true)}>
                Добавить базу вопросов
              </Button>
            </StyledButtonWrapper>
            {questionsBase && questionsBase.length > 0 && (
              <StyledWrapper>
                {questionsBase.map((questionBase) => (
                  <ListCard
                    key={questionBase.id}
                    item={questionBase}
                    icon={<StorageSharp color="primary" fontSize="large" />}
                    onClick={() =>
                      navigate(
                        generatePath(`${location.pathname}/questionBase/:questionBaseId`, {
                          questionBaseId: String(questionBase.id),
                        }),
                      )
                    }
                  />
                ))}
              </StyledWrapper>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {isOpenTestCreationModal && (
            <CreateTestModal
              open={isOpenTestCreationModal}
              onModalClose={() => setIsOpenTestCreationModal(false)}
              onModalSubmit={handleCreateTestModalSubmit}
            />
          )}
          <StyledButtonWrapper>
            <Button variant="contained" onClick={() => setIsOpenTestCreationModal(true)}>
              Создать тест
            </Button>
          </StyledButtonWrapper>
          <StyledCreationBox>
            <StyledCreationQuestions>
              <TestAccordionConstructor
                questionsBase={questionsBase || []}
                selectedQuestions={selectedQuestions}
                setSelectedQuestion={setSelectedQuestions}
              />
            </StyledCreationQuestions>
            <StyledQuestionsList>
              {selectedQuestions.map((selectedQuestion) => (
                <StyledQuestionBox>{selectedQuestion.questionText}</StyledQuestionBox>
              ))}
            </StyledQuestionsList>
          </StyledCreationBox>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <TestToStudentPage universityId={Number(universityId)} subjectId={Number(subjectId)} />
        </TabPanel>
      </StyledPageContentWrapper>
    </Box>
  );
};

export default SubjectInfoPage;
