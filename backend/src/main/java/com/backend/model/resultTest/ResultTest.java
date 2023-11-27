package com.backend.model.resultTest;

import com.backend.model.studentAnswer.StudentAnswer;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class ResultTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany
    private List<StudentAnswer> studentAnswers;
    private Duration duration;
    private double mark;
    private LocalDateTime beginningTest;
    private LocalDateTime endingTest;
    private boolean percent;
    private int correctCount;
}
