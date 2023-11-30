package com.backend.model.resultTest.dto;

import com.backend.model.resultAnswer.ResultAnswer;
import com.backend.model.student.dto.StudentOutputDTO;
import lombok.Data;

import java.util.List;


@Data
public class ResultTestInputDTO {

    private List<ResultAnswer> studentAnswers;
    private StudentOutputDTO student;
    private double mark;
}
