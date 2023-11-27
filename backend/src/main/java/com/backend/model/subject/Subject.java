package com.backend.model.subject;

import com.backend.model.subject.dto.SubjectInputDTO;
import com.backend.model.questionBase.QuestionBase;
import com.backend.model.test.Test;
import com.backend.model.university.University;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "subject")
@Data
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private List<QuestionBase> questionBases;
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private List<Test> tests;

    public void update(SubjectInputDTO subjectDTO) {
        name = subjectDTO.getName();
    }
}
