package com.backend.model.resultQuestion.dto;

import com.backend.model.resultAnswer.ResultAnswer;
import com.backend.model.resultTest.ResultTest;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
public class ResultQuestionDTO {

    private Long id;
    private String name;
    private String comment;
    private Double mark;
    private String duration;
}
