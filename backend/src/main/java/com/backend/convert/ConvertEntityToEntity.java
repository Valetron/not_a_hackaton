package com.backend.convert;

import com.backend.configuration.ModelMapperConfig;
import com.backend.model.answer.Answer;
import com.backend.model.resultAnswer.ResultAnswer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConvertEntityToEntity {

    @Autowired
    private ModelMapper modelMapper;

    public ResultAnswer answerToResultAnswer(Answer answer){
        return modelMapper.map(answer, ResultAnswer.class);
    }
}
