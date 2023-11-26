import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionGroupModal from '@/components/Modal/AddQuestionGroupModal/AddQuestionGroupModal';
import QuestionGroupListItem from '@/components/QuestionGroupList/QuestionGroupListItem';
import { useQuestionGroups } from '@/shared/api/hooks/useQuestionGroups';
import { createQuestionGroup } from '@/shared/api/fetchers/questionGroupFetcher';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { StyledButtonWrapper } from '@/pages/QuestionBaseInfoPage/QuestionBaseInfoPage.styled';

const QuestionBaseInfoPage = () => {
  const { id } = useParams();
  const { questionGroups, isLoading, mutate, error } = useQuestionGroups(Number(id));
  const { successToast, errorToast } = useToast();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalSubmit = useCallback(
    async (name?: string) => {
      try {
        const createdQuestionGroup = await createQuestionGroup(name, Number(id));
        await mutate([...(questionGroups || []), createdQuestionGroup]);
        successToast('Успешно создано');
        setIsOpen(false);
      } catch {
        errorToast('Ошибка');
      }
    },
    [id],
  );

  return (
    <Card>
      {/*{isOpen && (*/}
      <AddQuestionGroupModal open={isOpen} onModalSubmit={handleModalSubmit} onModalClose={() => setIsOpen(false)} />
      {/*)}*/}
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {/*{subjectInfo?.name}*/}
        </Typography>

        <StyledButtonWrapper>
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Добавить группу вопросов
          </Button>
        </StyledButtonWrapper>

        {questionGroups && (
          <Box sx={{ padding: '16px' }}>
            Группы вопросов
            {questionGroups.map((questionGroup) => (
              <QuestionGroupListItem key={questionGroup.id} questionGroup={questionGroup} />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionBaseInfoPage;
