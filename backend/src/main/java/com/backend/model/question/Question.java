package com.backend.model.question;

import com.backend.model.answer.Answer;
import com.backend.model.question.dto.QuestionInputDTO;
import com.backend.model.questionGroup.QuestionGroup;
import com.backend.model.questionInTest.QuestionInTest;
import com.backend.model.student.Student;
import com.backend.model.test.Test;
import com.backend.model.university.dto.UniversityInputDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

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

    public void update(QuestionInputDTO questionInputDTO){
        questionText = questionInputDTO.getQuestionText();
        commentCorrect = questionInputDTO.getCommentCorrect();
        commentError = questionInputDTO.getCommentError();
        commentWithoutAnswer = questionInputDTO.getCommentWithoutAnswer();
        mixAnswer = questionInputDTO.isMixAnswer();
        mark = questionInputDTO.getMark();
    }
}
