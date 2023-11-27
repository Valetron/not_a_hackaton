package com.backend.model.questionInTest;

import com.backend.model.question.Question;
import com.backend.model.test.Test;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class QuestionInTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @ManyToOne
    private Question question;
    @ManyToOne
    private Test test;

    public QuestionInTest(Test test, Question question) {
        this.question = question;
        this.test = test;
    }
}
