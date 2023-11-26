import { HackathonApi } from '@/shared/api/HackathonApi';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { getQuestionsByGroupId } from '@/shared/api/fetchers/questionGroupFetcher';
import { StyledAccordionDetails } from '@/components/TestAccordionConstructor/TestAccordionConstructor.styled';
import { Add } from '@mui/icons-material';

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
            <Add />
            {question.questionText}
          </StyledAccordionDetails>
        ))}
    </>
  );
};

export default AccordionQuestions;
