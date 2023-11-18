package com.backend.model;

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
    @OneToMany
    private List<QuestionBase> questionBases;
}
