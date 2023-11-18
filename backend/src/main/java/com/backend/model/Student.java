package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "student")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long chatId;
    private String username;
    private String name;
    private String patronymic;
    private String surname;
    @ManyToOne
    private University university;
    @ManyToOne
    private StudentGroup group;
    @OneToMany
    private List<Test> tests;
    @OneToMany
    private List<ResultTest> results;


}
