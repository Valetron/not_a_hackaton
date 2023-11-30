package com.backend.model.resultAnswer;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.resultAnswer.dto.ResultAnswerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultAnswerService {

    @Autowired
    private ResultAnswerRepository resultAnswerRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public List<ResultAnswerDTO> getAnswers(Long resultQuestionId){
        return resultAnswerRepository.findAllByQuestionId(resultQuestionId).stream()
                .map(convertEntityToDto::resultAnswerToDto).toList();
    }
}
