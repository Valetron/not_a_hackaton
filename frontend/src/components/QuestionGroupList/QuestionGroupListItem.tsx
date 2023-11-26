import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, SyntheticEvent, useCallback, useState } from 'react';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { getQuestionsByGroupId } from '@/shared/api/fetchers/questionGroupFetcher';
import AddQuestionModal from '@/components/Modal/AddQuestionModal/AddQuestionModal';

interface QuestionGroupListItemProps {
  questionGroup: HackathonApi.QuestionGroupOutputDTO;
}

const QuestionGroupListItem: FC<QuestionGroupListItemProps> = ({ questionGroup }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [questions, setQuestions] = useState<HackathonApi.QuestionOutputDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const fetchQuestions = useCallback(async () => {
    if (!questionGroup.id) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await getQuestionsByGroupId(questionGroup.id);
      setQuestions(response);
    } catch {
      //
    }

    setIsLoading(false);
  }, [questionGroup]);

  const onChangeHandler = useCallback(
    async (event: SyntheticEvent, expanded: boolean) => {
      if (expanded) {
        await fetchQuestions();
      }
    },
    [fetchQuestions],
  );

  return (
    <Accordion
      onChange={onChangeHandler}
      sx={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .2)',
      }}
    >
      {isOpen && (
        <AddQuestionModal
          open={isOpen}
          onModalClose={handleModalClose}
          questionGroupId={questionGroup.id as number}
          setQuestions={setQuestions}
        />
      )}
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{questionGroup.name}</Typography>
      </AccordionSummary>
      {!isLoading &&
        questions.map((question) => <AccordionDetails key={question.id}>{question.questionText}</AccordionDetails>)}
      {isLoading && <CircularProgress />}
      <AccordionDetails>
        <Button onClick={handleModalOpen}>+ Добавить вопрос</Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionGroupListItem;
