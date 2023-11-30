package com.backend.model.test.dto;

import com.backend.model.question.Question;
import com.backend.model.question.dto.QuestionOutputDTO;
import lombok.Data;

import java.time.Duration;
import java.util.List;

@Data
public class TestOutputDTO {

    private Long id;
    private String name;
    private String link;
    private String description;
    private int duration;
}
