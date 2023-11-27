package com.backend.model.question;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.question.dto.QuestionInputDTO;
import com.backend.convert.ConvertDtoToEntity;
import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.questionGroup.QuestionGroup;
import com.backend.model.questionGroup.QuestionGroupRepository;
import com.backend.model.questionGroup.dto.QuestionGroupOutputDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private QuestionGroupRepository questionGroupRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public QuestionOutputDTO createQuestion(Long questionGroupId, QuestionInputDTO questionDto){
        Question question = convertDtoToEntity.questionToEntity(questionDto);
        QuestionGroup questionGroup = questionGroupRepository.findById(questionGroupId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "группа вопросов не найден"));
        question.setQuestionGroup(questionGroup);
        questionRepository.save(question);
        return convertEntityToDto.questionToDto(question);
    }


    public List<QuestionOutputDTO> getAllQuestions(Long questionGroupId) {
        List<Question> questions = questionRepository.findByQuestionGroupId(questionGroupId);
        return questions.stream().map(x -> convertEntityToDto.questionToDto(x)).toList();
    }

    public QuestionOutputDTO getQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));
        return convertEntityToDto.questionToDto(question);
    }

    public QuestionOutputDTO updateQuestion(Long questionId, QuestionInputDTO questionInputDTO) {
        Question question = questionRepository.findById(questionId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));
        question.update(questionInputDTO);
        questionRepository.save(question);
        return convertEntityToDto.questionToDto(question);
    }

    public QuestionOutputDTO deletequestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));
        questionRepository.delete(question);
        return convertEntityToDto.questionToDto(question);
    }
}
