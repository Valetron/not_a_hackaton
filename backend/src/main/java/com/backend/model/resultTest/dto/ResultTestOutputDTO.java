package com.backend.model.resultTest.dto;

import com.backend.model.resultQuestion.ResultQuestion;
import com.backend.model.resultQuestion.dto.ResultQuestionDTO;
import com.backend.model.resultTest.ResultTest;
import com.backend.model.student.Student;
import com.backend.model.student.dto.StudentOutputDTO;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ResultTestOutputDTO {

    private Long id;
    private String testName;
    private int duration;
    private double mark;
    private double percent;
    private int correctCount;
    private LocalDateTime beginningTest;
    private LocalDateTime endingTest;

}
