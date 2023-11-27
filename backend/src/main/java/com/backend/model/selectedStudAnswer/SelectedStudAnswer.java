package com.backend.model.selectedStudAnswer;

import com.backend.model.answer.Answer;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class SelectedStudAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "selectedStudAnswer")
    private List<Answer> answers;
    @OneToOne
    private SelectedStudAnswer selectedStudAnswers;
    private boolean isSelected;

}
