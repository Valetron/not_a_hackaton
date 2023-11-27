package com.backend.model.answer;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.answer.dto.AnswerInputDTO;
import com.backend.convert.ConvertDtoToEntity;
import com.backend.model.answer.dto.AnswerOutputDTO;
import com.backend.model.question.Question;
import com.backend.model.question.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public List<AnswerOutputDTO> createAnswer(Long answerId, AnswerInputDTO[] answerInputDTOs){
        Question question = questionRepository.findById(answerId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));

        List<Answer> answers = new ArrayList<>();
        for (AnswerInputDTO answerInputDTO: answerInputDTOs) {
            Answer answer = convertDtoToEntity.answerToEntity(answerInputDTO);
            answer.setQuestion(question);
            answers.add(answer);
        }
        answerRepository.saveAll(answers);
        return answers.stream().map(x -> convertEntityToDto.answerToDto(x)).toList();
    }

    public List<AnswerOutputDTO> getAllAnswers(Long questionId) {
        List<Answer> answers = answerRepository.findByQuestionId(questionId);
        return answers.stream().map(x -> convertEntityToDto.answerToDto(x)).toList();
    }
    public AnswerOutputDTO updateAnswer(Long answerId, AnswerInputDTO answerInputDTO){
        Answer answer = answerRepository.findById(answerId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));
        answer.update(answerInputDTO);
        answerRepository.save(answer);
        return convertEntityToDto.answerToDto(answer);
    }

    public AnswerOutputDTO deleteAnswer(Long answerId){
        Answer answer = answerRepository.findById(answerId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));
        answerRepository.delete(answer);
        return convertEntityToDto.answerToDto(answer);
    }
}
