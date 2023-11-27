package com.backend.model.answer.dto;

import lombok.Data;

@Data
public class AnswerOutputDTO {

    private Long id;
    private String answerText;
    private boolean isCorrect;
}
