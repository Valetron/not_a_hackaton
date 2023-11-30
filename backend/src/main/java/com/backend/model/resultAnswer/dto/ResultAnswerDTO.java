package com.backend.model.resultAnswer.dto;

import com.backend.model.resultQuestion.ResultQuestion;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class ResultAnswerDTO {

    private Long id;
    private String name;
    private Boolean isCorrect;
    private Boolean isSelected;
}
