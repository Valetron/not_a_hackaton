package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany
    private List<Question> questions;
    private String link;
    private String description;
    private Duration duration;
    private LocalDateTime startTest;
    private LocalDateTime endTest;
    @ManyToOne
    private Student student;
}
