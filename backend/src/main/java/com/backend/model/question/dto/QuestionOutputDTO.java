package com.backend.model.question.dto;

import com.backend.model.answer.dto.AnswerOutputDTO;
import lombok.Data;

import java.util.List;

@Data
public class QuestionOutputDTO {

    private Long id;
    private String questionText;
    private String commentCorrect;
    private String commentError;
    private String commentWithoutAnswer;
    private boolean mixAnswer;
    private Double mark;
}
