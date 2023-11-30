package com.backend.model.user;

import com.backend.model.role.Role;
import com.backend.model.session.Session;
import com.backend.model.studentGroup.StudentGroup;
import com.backend.model.university.University;
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
    @Column(unique = true)
    private String email;
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
