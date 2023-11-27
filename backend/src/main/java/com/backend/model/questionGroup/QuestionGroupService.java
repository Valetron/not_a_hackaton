package com.backend.model.questionGroup;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.questionGroup.dto.QuestionGroupInputDTO;
import com.backend.convert.ConvertDtoToEntity;
import com.backend.model.questionGroup.dto.QuestionGroupOutputDTO;
import com.backend.model.questionBase.QuestionBase;
import com.backend.model.questionBase.QuestionBaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class QuestionGroupService {

    @Autowired
    private QuestionBaseRepository questionBaseRepository;
    @Autowired
    private QuestionGroupRepository questionGroupRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;
    public QuestionGroupOutputDTO createQuestionGroup(Long questionBaseId, QuestionGroupInputDTO questionGroupDto){
        QuestionGroup questionGroup = convertDtoToEntity.questionGroupToEntity(questionGroupDto);
        QuestionBase questionBase = questionBaseRepository.findById(questionBaseId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "база вопросов не найден "));
        questionGroup.setQuestionBase(questionBase);
        questionGroupRepository.save(questionGroup);
        return convertEntityToDto.questionGroupToDto(questionGroup);
    }

    public List<QuestionGroupOutputDTO> getAllQuestionGroups(Long questionBaseId) {
        List<QuestionGroup> questionGroups = questionGroupRepository.findByQuestionBaseId(questionBaseId);
        return questionGroups.stream().map(x -> convertEntityToDto.questionGroupToDto(x)).toList();
    }

    public QuestionGroupOutputDTO updateQuestionGroup(Long questionGroupId, QuestionGroupInputDTO questionGroupDTO){
        QuestionGroup questionGroup = questionGroupRepository.findById(questionGroupId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "группа вопросов не найден "));
        questionGroup.update(questionGroupDTO);
        questionGroupRepository.save(questionGroup);
        return convertEntityToDto.questionGroupToDto(questionGroup);
    }

    public QuestionGroupOutputDTO deleteQuestionGroup(Long questionGroupId) {
        QuestionGroup questionGroup = questionGroupRepository.findById(questionGroupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "группа вопросов не найден"));
        questionGroupRepository.delete(questionGroup);
        return convertEntityToDto.questionGroupToDto(questionGroup);
    }

    public QuestionGroupOutputDTO getQuestionGroup(Long questionGroupId) {
        QuestionGroup questionGroup = questionGroupRepository.findById(questionGroupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "группа вопросов не найден"));
        return convertEntityToDto.questionGroupToDto(questionGroup);
    }
}
