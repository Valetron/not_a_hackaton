package com.backend.model.question.dto;

import com.backend.model.answer.dto.AnswerInputDTO;
import lombok.Data;

import java.util.List;

@Data
public class QuestionInputDTO {

    private String questionText;
    private String commentCorrect;
    private String commentError;
    private String commentWithoutAnswer;
    private boolean mixAnswer;
    private double mark;
}
