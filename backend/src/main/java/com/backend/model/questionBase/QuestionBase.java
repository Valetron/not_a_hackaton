package com.backend.model.questionBase;

import com.backend.model.questionBase.dto.QuestionBaseInputDTO;
import com.backend.model.questionGroup.QuestionGroup;
import com.backend.model.subject.Subject;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class QuestionBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private Subject subject;
    @OneToMany(mappedBy = "questionBase", cascade = CascadeType.ALL)
    private List<QuestionGroup> questionGroups;


    public void update(QuestionBaseInputDTO questionBaseDTO) {
        name = questionBaseDTO.getName();
    }
}
