package com.backend.model.test;

import com.backend.model.activeTest.ActiveTest;
import com.backend.model.questionInTest.QuestionInTest;
import com.backend.model.student.Student;
import com.backend.model.question.Question;
import com.backend.model.subject.Subject;
import com.backend.model.test.dto.TestInputDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String link;
    private String description;
    private int duration;
    @ManyToOne
    private Subject subject;
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    private List<QuestionInTest> questions;
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    private List<ActiveTest> activeTests;

    public void update(TestInputDTO testInputDTO){
        name = testInputDTO.getName();
        link = testInputDTO.getLink();
        description = testInputDTO.getDescription();
        duration = testInputDTO.getDuration();
    }
}
