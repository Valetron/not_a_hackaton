import { FC, Fragment } from 'react';
import BaseModal from '@/components/Modal/BaseModal';
import { HackathonApi } from '@/shared/api/HackathonApi';
import {
  StyledModalWrapper,
  StyledQuestionNameWrapper,
  StyledAnswerContainer,
  StyledQuestionContainer,
  StyledUserInfoWrapper,
  StyledLoadingContainer,
} from '@/components/Modal/CheckTestDetailsModal/CheckTestDetailsModal.styled';
import { Box, CircularProgress } from '@mui/material';
import { CloseSharp, DoneAllSharp } from '@mui/icons-material';
import { useTestQuestions } from '@/shared/api/hooks/useTestQuestions';

interface CheckTestDetailsModalProps {
  title: string;
  open: boolean;
  onModalClose: () => void;
  test: HackathonApi.ResultTestOutputDTO;
  studentInfo: HackathonApi.StudentOutputDTO;
}

const CheckTestDetailsModal: FC<CheckTestDetailsModalProps> = ({ title, open, onModalClose, test, studentInfo }) => {
  const { fullData, isLoading } = useTestQuestions(test.id!);

  const handleCloseModal = () => {
    onModalClose();
  };

  return (
    <BaseModal
      open={open}
      fullWidth
      title={title}
      onModalClose={handleCloseModal}
      styleOverride={{ padding: '64px 32px' }}
      dialogStyledOverride={{
        '& .MuiPaper-root': {
          maxWidth: '800px',
          width: '800px',
        },
      }}
    >
      {!isLoading ? (
        <StyledModalWrapper>
          <Box sx={{ alignSelf: 'center', fontSize: '22px', fontWeight: 700 }}>{test?.testName}</Box>
          <StyledUserInfoWrapper>
            <Box sx={{ fontSize: '18px' }}>
              Студент: {studentInfo?.name} {studentInfo?.surname} {studentInfo?.patronymic}
            </Box>
            <Box>Итоговый балл: {test?.correctCount || 'Ошибка'}</Box>
          </StyledUserInfoWrapper>

          {fullData.map((data) => (
            <StyledQuestionContainer key={data.id}>
              <StyledQuestionNameWrapper>{data.name}</StyledQuestionNameWrapper>
              {data.answers.some((item) => !item.isCorrect && item.isSelected) ? (
                <>
                  <StyledAnswerContainer>
                    <CloseSharp color="error" />
                    Неправильный ответ:{' '}
                    {data.answers
                      .filter((ans) => ans.isSelected)
                      .map((item) => item.name)
                      .join(', ')}
                  </StyledAnswerContainer>
                  <Box>
                    Правильный ответ:{' '}
                    {data.answers
                      .filter((ans) => ans.isCorrect)
                      .map((item) => item.name)
                      .join(', ')}
                  </Box>
                </>
              ) : (
                <StyledAnswerContainer>
                  <DoneAllSharp color="success" /> Правильный ответ: {data.answers.map((item) => item.name).join(', ')}
                </StyledAnswerContainer>
              )}
              {/*<StyledAnswerContainer>*/}
              {/*  <DoneAllSharp color="success" /> Правильный ответ: КРУТО МОЛОДЕЦ*/}
              {/*</StyledAnswerContainer>*/}
            </StyledQuestionContainer>
          ))}

          {/*<StyledQuestionContainer>*/}
          {/*  <StyledQuestionNameWrapper>Вопрос 1</StyledQuestionNameWrapper>*/}
          {/*  <StyledAnswerContainer>*/}
          {/*    <DoneAllSharp color="success" /> Правильный ответ: КРУТО МОЛОДЕЦ*/}
          {/*  </StyledAnswerContainer>*/}
          {/*</StyledQuestionContainer>*/}

          {/*<StyledQuestionContainer>*/}
          {/*  <StyledQuestionNameWrapper>Вопрос 2</StyledQuestionNameWrapper>*/}
          {/*  <StyledAnswerContainer>*/}
          {/*    <CloseSharp color="error" />*/}
          {/*    Неправильный ответ: 12312321312*/}
          {/*  </StyledAnswerContainer>*/}
          {/*  <Box>Правильный ответ: ААА</Box>*/}
          {/*</StyledQuestionContainer>*/}
        </StyledModalWrapper>
      ) : (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      )}
    </BaseModal>
  );
};

export default CheckTestDetailsModal;
