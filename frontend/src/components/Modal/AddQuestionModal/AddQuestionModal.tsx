import { Dispatch, FC, SetStateAction, useState } from 'react';
import BaseModal from '@/components/Modal/BaseModal';
import Wysiwyg from '@/components/Wysiwyg/Wysiwyg';
import { Button } from '@mui/material';
import { parseMarkdownStringToQuestion } from '@/shared/api/utils/adapters';
import { WYSIWYG_TEMPLATE } from '@/shared/api/utils/constants';
import { createAnswers, createQuestion } from '@/shared/api/fetchers/questionFetcher';
import { useToast } from '@/providers/ToastProvider/ToastProvider';
import { HackathonApi } from '@/shared/api/HackathonApi';

interface AddQuestionModalProps {
  open: boolean;
  onModalClose: () => void;
  questionGroupId: number;
  setQuestions: Dispatch<SetStateAction<HackathonApi.QuestionOutputDTO[]>>;
}

const AddQuestionModal: FC<AddQuestionModalProps> = ({ open, onModalClose, questionGroupId, setQuestions }) => {
  const { successToast, errorToast } = useToast();

  const [value, setValue] = useState<string | undefined>(WYSIWYG_TEMPLATE);

  const onSubmit = async () => {
    try {
      const question = parseMarkdownStringToQuestion(value as string);

      const createdQuestion = await createQuestion({ ...question }, questionGroupId);
      await createAnswers(question.answers, createdQuestion.id as number);

      setQuestions((prev) => [...prev, createdQuestion]);

      successToast('Создана сущность');
      onModalClose();
    } catch {
      errorToast('Ошибка при создании сущности');
    }
  };

  return (
    <BaseModal
      open={open}
      fullWidth
      title="Добавление вопроса"
      onModalClose={onModalClose}
      styleOverride={{
        padding: '64px 0',
      }}
      data-color-mode="light"
    >
      <Wysiwyg value={value} dispatchValue={setValue} />
      <Button variant="contained" onClick={onSubmit}>
        Добавить вопрос
      </Button>
    </BaseModal>
  );
};

export default AddQuestionModal;
