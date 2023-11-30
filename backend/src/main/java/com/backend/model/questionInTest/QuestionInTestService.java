package com.backend.model.questionInTest;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.answer.Answer;
import com.backend.model.answer.dto.AnswerOutputDTO;
import com.backend.model.question.Question;
import com.backend.model.question.QuestionRepository;
import com.backend.model.question.dto.QuestionOutputDtoForBot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class QuestionInTestService {

    @Autowired
    private QuestionInTestRepository qitRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public List<QuestionOutputDtoForBot> getAllQuestionInTest(Long testId){
        List<QuestionInTest> questionsInTest = qitRepository.findQuestionInTestByTestId(testId);
        List<Question> questions = questionRepository.findAllByTests(questionsInTest);
        List<QuestionOutputDtoForBot> questionsOut = new LinkedList<>();
        for (Question question : questions){
            List<AnswerOutputDTO> answers = question.getAnswers()
                    .stream().map(convertEntityToDto::answerToDto).toList();
            QuestionOutputDtoForBot questionTemp = convertEntityToDto.questionInTestToDtoForBot(question);
            questionTemp.setAnswers(answers);
            questionsOut.add(questionTemp);
        }
        return questionsOut;
    }
}
