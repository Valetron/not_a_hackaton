import { HackathonApi } from '@/shared/api/HackathonApi';

interface QuestionInputDTOWithAnswers extends HackathonApi.QuestionInputDTO {
  answers: HackathonApi.AnswerInputDTO[];
}

export const parseMarkdownStringToQuestion = (markdown: string) => {
  const lines = markdown.split('\n');
  const question: QuestionInputDTOWithAnswers = {
    answers: [],
  };
  let currentAnswer: HackathonApi.AnswerInputDTO | null = null;

  for (const line of lines) {
    if (line.startsWith('**Текст вопроса:**')) {
      question.questionText = line.replace('**Текст вопроса:**', '').trim();
    } else if (line.startsWith('**Оценка:**')) {
      question.mark = parseInt(line.replace('**Оценка:**', '').trim(), 10);
    } else if (line.startsWith('**Разнообразные варианты ответов:**')) {
      question.mixAnswer = line.includes('true');
    } else if (line.startsWith('**Правильный ответ:**')) {
      const correctAnswer = line.replace('**Правильный ответ:**', '').trim();
      question.answers.forEach((answer) => {
        if (answer.name === correctAnswer) {
          answer.isCorrect = true;
        }
      });
    } else if (line.startsWith('**Ошибка в ответе:**')) {
      question.commentError = line.replace('**Ошибка в ответе:**', '').trim();
    } else if (line.startsWith('**Ответ отсутствует:**')) {
      question.commentWithoutAnswer = line.replace('**Ответ отсутствует:**', '').trim();
    } else if (line.match(/^\d+\.\s*(.+) - правильный$/)) {
      const match = line.match(/^\d+\.\s*(.+) - правильный$/);
      if (match) {
        const name = match[1].trim();
        currentAnswer = { name, isCorrect: true };
        question.answers.push(currentAnswer);
      }
    } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.')) {
      const name = line.replace(/^\d+\./, '').trim();
      currentAnswer = { name, isCorrect: false };
      question.answers.push(currentAnswer);
    }
  }

  return question;
};
