import { Button, Card, CardContent, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '@/components/TabPanel/TabPanel';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
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
} from '@/pages/SubjectInfoPage/SubjectInfoPage.styled';
import TestAccordionConstructor from '@/components/TestAccordionConstructor/TestAccordionConstructor';
import CreateTestModal from '@/components/Modal/CreateTestModal/CreateTestModal';
import { addQuestionsToTest, createTest } from '@/shared/api/fetchers/testFetcher';

const SubjectInfoPage = () => {
  const { id } = useParams();
  const { successToast, errorToast } = useToast();
  const { questionsBase, isLoading, mutate, error } = useQuestionsBase(Number(id));
  const navigate = useNavigate();

  const [subjectInfo, setSubjectInfo] = useState<HackathonApi.SubjectOutputDTO>();
  const [selectedQuestions, setSelectedQuestions] = useState<HackathonApi.QuestionOutputDTO[]>([]);

  const [tabValue, setTabValue] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenTestCreationModal, setIsOpenTestCreationModal] = useState<boolean>(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleModalSubmit = useCallback(
    async (name?: string) => {
      try {
        const createdQuestionBase = await createQuestionBase(name, Number(id));
        await mutate([...(questionsBase || []), createdQuestionBase]);
        successToast('Успешно создано');
        setIsOpen(false);
      } catch {
        errorToast('Ошибка');
      }
    },
    [errorToast, id, mutate, questionsBase, successToast],
  );

  const handleCreateTestModalSubmit = useCallback(
    async (data: HackathonApi.TestInputDTO) => {
      try {
        const createdTest = await createTest(data, Number(id));

        const addedQuestions = selectedQuestions.map((question) => question.id);
        await addQuestionsToTest(addedQuestions as number[], createdTest.id!);

        successToast('Тест создан');
        setIsOpenTestCreationModal(false);
        setSelectedQuestions([]);
      } catch {
        errorToast('Ошибка при создании теста');
      }
    },
    [id, selectedQuestions],
  );

  useEffect(() => {
    const fetchSubjectInfo = async () => {
      try {
        const subject = await getSubjectInfoById(Number(id));
        setSubjectInfo(subject);
      } catch {
        //
      }
    };
    fetchSubjectInfo();
  }, [id]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Card>
      {isOpen && (
        <AddQuestionBaseModal open={isOpen} onModalSubmit={handleModalSubmit} onModalClose={() => setIsOpen(false)} />
      )}
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Дисциплина: {subjectInfo?.name}
        </Typography>

        <Tabs value={tabValue} onChange={handleChange} aria-label="Университет">
          <Tab label="Базы вопросов" id="tab-1" />
          <Tab label="Создание теста" id="tab-2" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Добавить базу вопросов
          </Button>
          {questionsBase && questionsBase.length > 0 && (
            <StyledWrapper>
              {questionsBase.map((questionBase) => (
                <ListCard
                  key={questionBase.id}
                  item={questionBase}
                  icon={<StorageSharp color="primary" fontSize="large" />}
                  onClick={() =>
                    navigate(
                      generatePath('/question-base/:id', {
                        id: String(questionBase.id),
                      }),
                    )
                  }
                />
              ))}
            </StyledWrapper>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {isOpenTestCreationModal && (
            <CreateTestModal
              open={isOpenTestCreationModal}
              onModalClose={() => setIsOpenTestCreationModal(false)}
              onModalSubmit={handleCreateTestModalSubmit}
            />
          )}
          <StyledCreationBox>
            <StyledCreationQuestions>
              <TestAccordionConstructor
                questionsBase={questionsBase || []}
                selectedQuestions={selectedQuestions}
                setSelectedQuestion={setSelectedQuestions}
              />
            </StyledCreationQuestions>
            <StyledCreationQuestions>
              {selectedQuestions.map((selectedQuestion) => (
                <div>{selectedQuestion.questionText}</div>
              ))}
            </StyledCreationQuestions>
          </StyledCreationBox>
          <StyledButtonWrapper>
            <Button variant="contained" onClick={() => setIsOpenTestCreationModal(true)}>
              Создать тест
            </Button>
          </StyledButtonWrapper>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default SubjectInfoPage;
