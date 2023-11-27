package com.backend.model.studentAnswer;

import com.backend.model.answer.Answer;
import com.backend.model.question.Question;
import com.backend.model.selectedStudAnswer.SelectedStudAnswer;
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
    private String question;
    private Duration duration;
    private String comment;
    @OneToOne
    private SelectedStudAnswer selectedStudAnswer;
}
