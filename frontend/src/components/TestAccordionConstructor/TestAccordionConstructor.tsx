import { StyledAccordion } from '@/components/TestAccordionConstructor/TestAccordionConstructor.styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction, SyntheticEvent, useCallback, useState } from 'react';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { getQuestionGroups } from '@/shared/api/fetchers/questionBaseFetcher';
import AccordionQuestions from '@/components/TestAccordionConstructor/AccordionQuestions';

interface TestAccordionConstructorProps {
  questionsBase: HackathonApi.QuestionBaseOutputDTO[];
  selectedQuestions: HackathonApi.QuestionOutputDTO[];
  setSelectedQuestion: Dispatch<SetStateAction<HackathonApi.QuestionOutputDTO[]>>;
}

const TestAccordionConstructor: FC<TestAccordionConstructorProps> = ({
  questionsBase,
  selectedQuestions,
  setSelectedQuestion,
}) => {
  const [questionGroups, setQuestionGroups] = useState<HackathonApi.QuestionGroupOutputDTO[]>([]);

  const fetchQuestionGroups = useCallback(async (questionBaseId: number) => {
    try {
      const response = await getQuestionGroups(questionBaseId);
      setQuestionGroups(response);
    } catch {
      //
    }
  }, []);

  const onChangeGroupBaseHandler = useCallback(
    async (event: SyntheticEvent, expanded: boolean, questionBaseId: number) => {
      if (expanded) {
        await fetchQuestionGroups(questionBaseId);
      }
    },
    [fetchQuestionGroups],
  );

  return questionsBase.map((questionBase) => (
    <StyledAccordion onChange={(event, expanded) => onChangeGroupBaseHandler(event, expanded, questionBase.id!)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{questionBase.name}</Typography>
      </AccordionSummary>
      {questionGroups &&
        questionGroups.map((questionGroup) => (
          <AccordionDetails key={questionGroup.id}>
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{questionGroup.name}</Typography>
              </AccordionSummary>
              <AccordionQuestions
                questionsGroup={questionGroup}
                selectedQuestions={selectedQuestions}
                setSelectedQuestion={setSelectedQuestion}
              />
            </StyledAccordion>
          </AccordionDetails>
        ))}
    </StyledAccordion>
  ));
};

export default TestAccordionConstructor;
