package com.backend.model.student;

import com.backend.model.resultTest.ResultTest;
import com.backend.model.studentGroup.StudentGroup;
import com.backend.model.test.Test;
import com.backend.model.university.University;
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
    private StudentGroup group;
}
