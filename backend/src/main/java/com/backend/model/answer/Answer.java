package com.backend.model.answer;

import com.backend.model.answer.dto.AnswerInputDTO;
import com.backend.model.question.Question;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String answerText;
    private boolean isCorrect;
    @ManyToOne
    private Question question;

    public void update(AnswerInputDTO answerInputDTO){
        answerText = answerInputDTO.getAnswerText();
        isCorrect = answerInputDTO.isCorrect();
    }
}
