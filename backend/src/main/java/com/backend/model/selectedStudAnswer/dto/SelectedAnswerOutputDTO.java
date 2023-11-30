package com.backend.model.selectedStudAnswer.dto;

import com.backend.model.answer.dto.AnswerOutputDTO;
import lombok.Data;

@Data
public class SelectedAnswerOutputDTO {
    private Long id;
    private AnswerOutputDTO answer;
    private Boolean isSelected;
}
