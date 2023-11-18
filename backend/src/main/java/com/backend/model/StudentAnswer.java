package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.util.List;

@Entity
@Data
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Question question;
    @OneToMany
    private List<Answer> answers;
    private Duration duration;
    private String comment;
}
