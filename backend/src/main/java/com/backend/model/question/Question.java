package com.backend.model.question;

import com.backend.model.answer.Answer;
import com.backend.model.question.dto.QuestionInputDTO;
import com.backend.model.questionGroup.QuestionGroup;
import com.backend.model.questionInTest.QuestionInTest;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String questionText;
    private String commentCorrect;
    private String commentError;
    private String commentWithoutAnswer;
    private boolean mixAnswer;
    private double mark;
    @ManyToOne
    private QuestionGroup questionGroup;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Answer> answers;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<QuestionInTest> tests;

    public void update(QuestionInputDTO questionInputDTO){
        questionText = questionInputDTO.getQuestionText();
        commentCorrect = questionInputDTO.getCommentCorrect();
        commentError = questionInputDTO.getCommentError();
        commentWithoutAnswer = questionInputDTO.getCommentWithoutAnswer();
        mixAnswer = questionInputDTO.isMixAnswer();
        mark = questionInputDTO.getMark();
    }
}
