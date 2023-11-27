package com.backend.model.test.dto;

import com.backend.model.question.Question;
import lombok.Data;

import java.time.Duration;
import java.util.List;

@Data
public class TestInputDTO {

    private String name;
    private String link;
    private String description;
    private int duration;
}
