import { HackathonApi } from '@/shared/api/HackathonApi';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { getQuestionsByGroupId } from '@/shared/api/fetchers/questionGroupFetcher';
import {
  StyledAccordionDetails,
  StyledContainer,
} from '@/components/TestAccordionConstructor/TestAccordionConstructor.styled';
import { Add, DeleteSharp } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

interface TestAccordionQuestionsProps {
  questionsGroup: HackathonApi.QuestionGroupOutputDTO;
  selectedQuestions: HackathonApi.QuestionOutputDTO[];
  setSelectedQuestion: Dispatch<SetStateAction<HackathonApi.QuestionOutputDTO[]>>;
}

const AccordionQuestions: FC<TestAccordionQuestionsProps> = ({
  questionsGroup,
  selectedQuestions,
  setSelectedQuestion,
}) => {
  const [questions, setQuestions] = useState<HackathonApi.QuestionOutputDTO[]>([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await getQuestionsByGroupId(questionsGroup.id!);
      console.log(response);
      setQuestions(response);
    } catch {
      //
    }
  }, [questionsGroup]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      {questions &&
        questions.map((question) => (
          <StyledAccordionDetails
            onClick={() => setSelectedQuestion((prev) => [...prev, question])}
            key={question.id}
            sx={{ bgcolor: selectedQuestions.find((item) => item.id === question.id) ? 'lightgreen' : '' }}
          >
            <StyledContainer>
              <Add />
              {question.questionText}
            </StyledContainer>
            <StyledContainer>
              <Button
                sx={{
                  color: 'red',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQuestion((prev) => prev.filter((q) => q.id !== question.id));
                }}
              >
                <DeleteSharp />
              </Button>
            </StyledContainer>
          </StyledAccordionDetails>
        ))}
    </>
  );
};

export default AccordionQuestions;
