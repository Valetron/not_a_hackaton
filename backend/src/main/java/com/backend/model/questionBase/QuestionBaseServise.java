package com.backend.model.questionBase;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.questionBase.dto.QuestionBaseInputDTO;
import com.backend.convert.ConvertDtoToEntity;
import com.backend.model.questionBase.dto.QuestionBaseOutputDTO;
import com.backend.model.subject.Subject;
import com.backend.model.subject.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class QuestionBaseServise {

    @Autowired
    private QuestionBaseRepository questionBaseRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;
    public QuestionBaseOutputDTO createQuestionBase(Long subjectId, QuestionBaseInputDTO questionBaseDTO){
        QuestionBase questionBase = convertDtoToEntity.questionBaseToEntity(questionBaseDTO);
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "дисциплина не найден "));
        questionBase.setSubject(subject);
        questionBaseRepository.save(questionBase);
        return convertEntityToDto.questionBaseToDto(questionBase);
    }

    public List<QuestionBaseOutputDTO> getAllQuestionBases(Long subjectId) {
        List<QuestionBase> questionBases = questionBaseRepository.findBySubjectId(subjectId);
        return questionBases.stream().map(x -> convertEntityToDto.questionBaseToDto(x)).toList();
    }

    public QuestionBaseOutputDTO updateQuestionBase(Long questionBaseId, QuestionBaseInputDTO questionBaseDTO){
        QuestionBase questionBase = questionBaseRepository.findById(questionBaseId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "база вопросов не найден "));
        questionBase.update(questionBaseDTO);
        questionBaseRepository.save(questionBase);
        return convertEntityToDto.questionBaseToDto(questionBase);
    }

    public QuestionBaseOutputDTO deleteQuestionBase(Long questionBaseId) {
        QuestionBase questionBase = questionBaseRepository.findById(questionBaseId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "база вопросов не найден"));
        questionBaseRepository.delete(questionBase);
        return convertEntityToDto.questionBaseToDto(questionBase);
    }

    public QuestionBaseOutputDTO getQuestionBase(Long questionBaseId) {
        QuestionBase questionBase = questionBaseRepository.findById(questionBaseId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "база вопросов не найден"));
        return convertEntityToDto.questionBaseToDto(questionBase);
    }
}
