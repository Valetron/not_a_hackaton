package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "university")
@Data
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @OneToMany
    private List<Subject> subjects;
    @OneToMany
    private List<StudentGroup> studentGroups;

}
