package com.backend.model.questionGroup;

import com.backend.model.questionGroup.dto.QuestionGroupInputDTO;
import com.backend.model.question.Question;
import com.backend.model.questionBase.QuestionBase;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class QuestionGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private QuestionBase questionBase;
    @OneToMany(mappedBy = "questionGroup", cascade = CascadeType.ALL)
    private List<Question> questions;

    public void update(QuestionGroupInputDTO questionGroupDTO) {
    }
}
