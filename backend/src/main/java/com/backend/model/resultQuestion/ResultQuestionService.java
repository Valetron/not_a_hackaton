package com.backend.model.resultQuestion;

import com.backend.convert.ConvertEntityToDto;
import com.backend.convert.ConvertEntityToEntity;
import com.backend.model.answer.Answer;
import com.backend.model.answer.AnswerRepository;
import com.backend.model.question.Question;
import com.backend.model.question.QuestionRepository;
import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.question.dto.QuestionOutputDtoForBot;
import com.backend.model.resultAnswer.ResultAnswer;
import com.backend.model.resultAnswer.ResultAnswerRepository;
import com.backend.model.resultQuestion.dto.ResultQuestionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResultQuestionService {

    @Autowired
    private ResultQuestionRepositry rQuestionRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private ResultAnswerRepository resultAnswerRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public Long saveAnswer(QuestionOutputDtoForBot question, List<Integer> numbersAnswers){
        ResultQuestion resultQuestion = new ResultQuestion();

        List<Answer> answers = answerRepository.findByQuestionId(question.getId());
        List<ResultAnswer> resultAnswers = new ArrayList<>();
        for (int i = 0; i< answers.size(); ++i){
            resultAnswers.add(new ResultAnswer());
        }
        resultAnswers.forEach(x -> x.setIsSelected(false));
        resultAnswerRepository.saveAll(resultAnswers);
        for (Integer nAnswer : numbersAnswers){
            resultAnswers.get(nAnswer-1).setIsSelected(true);
        }
        for (int i = 0; i< answers.size(); ++i){
            resultAnswers.get(i).setName(answers.get(i).getName());
            resultAnswers.get(i).setIsCorrect(answers.get(i).getIsCorrect());
        }
        boolean correctness = true;
        for (ResultAnswer answer : resultAnswers){
            if (answer.getIsSelected() && !answer.getIsCorrect() || !answer.getIsSelected() && answer.getIsCorrect()) {
                correctness = false;
                break;
            }
        }

        resultQuestion.setName(question.getQuestionText());
//   @TODO     resultQuestion.setDuration();
        if (numbersAnswers.isEmpty()){
            resultQuestion.setMark((double) 0);
            resultQuestion.setComment(question.getCommentWithoutAnswer());
        } else if (correctness){
            resultQuestion.setMark(question.getMark());
            resultQuestion.setComment(question.getCommentCorrect());
        } else if (!correctness){
            resultQuestion.setMark((double) 0);
            resultQuestion.setComment(question.getCommentError());
        }
        rQuestionRepository.save(resultQuestion);
        for (ResultAnswer resultAnswer : resultAnswers){
            resultAnswer.setQuestion(resultQuestion);
            resultAnswerRepository.save(resultAnswer);
        }


        return resultQuestion.getId();
    }

    public List<ResultQuestionDTO> getAllQuestions(Long resultTestId){
        return rQuestionRepository.findAllByTestId(resultTestId).stream()
                .map(convertEntityToDto::resultQuestionToDto).toList();
    }
}
