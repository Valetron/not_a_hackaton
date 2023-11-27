package com.backend.model.answer.dto;

import lombok.Data;

@Data
public class AnswerInputDTO {

    private String answerText;
    private boolean isCorrect;
}
