import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionGroupModal from '@/components/Modal/AddQuestionGroupModal/AddQuestionGroupModal';
import QuestionGroupListItem from '@/components/QuestionGroupList/QuestionGroupListItem';
import { useQuestionGroups } from '@/shared/api/hooks/useQuestionGroups';
import { createQuestionGroup } from '@/shared/api/fetchers/questionGroupFetcher';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import {
  StyledButtonWrapper,
  StyledQuestionBaseListWrapper,
} from '@/pages/QuestionBaseInfoPage/QuestionBaseInfoPage.styled';
import { StyledDisciplineListWrapper } from '@/pages/SubjectInfoPage/SubjectInfoPage.styled';
import { useQuestionBaseInfo } from '@/shared/api/hooks/useQuestionBaseInfo';

const QuestionBaseInfoPage = () => {
  const { questionBaseId } = useParams();
  const { questionGroups, isLoading, mutate, error } = useQuestionGroups(Number(questionBaseId));
  const { successToast, errorToast } = useToast();

  const { questionBaseInfo } = useQuestionBaseInfo(Number(questionBaseId));
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalSubmit = useCallback(
    async (name?: string) => {
      try {
        const createdQuestionGroup = await createQuestionGroup(name, Number(questionBaseId));
        await mutate([...(questionGroups || []), createdQuestionGroup]);
        successToast('Успешно создано');
        setIsOpen(false);
      } catch {
        errorToast('Ошибка');
      }
    },
    [questionBaseId],
  );

  return (
    <Box>
      {/*{isOpen && (*/}
      <AddQuestionGroupModal open={isOpen} onModalSubmit={handleModalSubmit} onModalClose={() => setIsOpen(false)} />
      {/*)}*/}
      <CardContent>
        <Typography variant="h4" gutterBottom>
          База вопросов: {questionBaseInfo?.name}
        </Typography>

        <StyledButtonWrapper>
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Добавить группу вопросов
          </Button>
        </StyledButtonWrapper>

        {questionGroups && (
          <Box sx={{ padding: '16px' }}>
            <Box sx={{ fontSize: '18px' }}>Группы вопросов</Box>
            <StyledQuestionBaseListWrapper>
              {questionGroups.map((questionGroup) => (
                <QuestionGroupListItem key={questionGroup.id} questionGroup={questionGroup} />
              ))}
            </StyledQuestionBaseListWrapper>
          </Box>
        )}
      </CardContent>
    </Box>
  );
};

export default QuestionBaseInfoPage;
