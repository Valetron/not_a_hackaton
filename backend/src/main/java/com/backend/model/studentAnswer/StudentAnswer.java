package com.backend.model.studentAnswer;

import com.backend.model.answer.Answer;
import com.backend.model.question.Question;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.util.List;

@Entity
@Data
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Question question;
    private Duration duration;
    private String comment;
}
