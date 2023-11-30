package com.backend.model.selectedStudAnswer;

import com.backend.model.answer.Answer;
import com.backend.model.resultAnswer.ResultAnswer;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class SelectedAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Answer answer;
    @ManyToOne
    private ResultAnswer studentAnswer;
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isSelected;

}
