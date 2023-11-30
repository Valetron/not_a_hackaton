package com.backend.model.resultQuestion;

import com.backend.model.resultAnswer.ResultAnswer;
import com.backend.model.resultTest.ResultTest;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class ResultQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String comment;
    private Double mark;
    private String duration;
    @OneToMany(mappedBy = "question")
    private List<ResultAnswer> answers;
    @ManyToOne
    private ResultTest test;
}
