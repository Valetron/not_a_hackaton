package com.backend.model.question.dto;

import com.backend.model.answer.Answer;
import com.backend.model.answer.dto.AnswerOutputDTO;
import com.backend.model.questionGroup.QuestionGroup;
import com.backend.model.questionInTest.QuestionInTest;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
public class QuestionOutputDtoForBot {

    private Long id;
    private String questionText;
    private String commentCorrect;
    private String commentError;
    private String commentWithoutAnswer;
    private boolean mixAnswer;
    private double mark;
    private List<AnswerOutputDTO> answers;
    //private List<QuestionInTest> tests;

}
