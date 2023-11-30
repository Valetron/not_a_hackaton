package com.backend.model.resultTest;

import com.backend.model.resultQuestion.ResultQuestion;
import com.backend.model.student.Student;
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
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    private List<ResultQuestion> questions;
    @ManyToOne
    private Student student;
    private String testName;
    private Duration duration;
    private Double mark;
    private LocalDateTime beginningTest;
    private LocalDateTime endingTest;
    private Double percent;
    private int correctCount;
}


