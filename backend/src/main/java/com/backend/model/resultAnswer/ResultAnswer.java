package com.backend.model.resultAnswer;

import com.backend.model.resultQuestion.ResultQuestion;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ResultAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean isCorrect;
    private Boolean isSelected;
    @ManyToOne
    private ResultQuestion question;
}
