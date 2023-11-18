package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String questionText;
    @OneToMany
    private List<Answer> answers;
    private String commentCorrect;
    private String commentError;
    private String commentWithoutAnswer;
    private boolean mixAnswer;
    private double mark;
}
