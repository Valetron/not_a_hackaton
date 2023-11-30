package com.backend.model.answer;

import com.backend.model.answer.dto.AnswerInputDTO;
import com.backend.model.question.Question;
import com.backend.model.selectedStudAnswer.SelectedAnswer;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean isCorrect;
    @ManyToOne
    private Question question;

    public void update(AnswerInputDTO answerInputDTO){
        name = answerInputDTO.getName();
        isCorrect = answerInputDTO.getIsCorrect();
    }
}
