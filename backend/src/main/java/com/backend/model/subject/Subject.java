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
    private University university;

    public void update(SubjectInputDTO subjectDTO) {
        name = subjectDTO.getName();
    }
}
