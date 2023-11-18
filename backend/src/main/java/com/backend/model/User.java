package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "user_system")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String patronymic;
    private String description;
    private String email;
    private String telegram;
    private String phone;
    private String password;
    @OneToOne
    private University university;
    @OneToOne
    private Role role;
    @OneToMany
    private List<StudentGroup> studentGroups;
    @OneToOne
    private Session session;
}
