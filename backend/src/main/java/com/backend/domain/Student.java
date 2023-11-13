package com.backend.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Student {

    public Student(){};

    public Student(Long chatId, String username, String firstname, String midlename, String surname,
                   String university, String title_group ) {

        this.chatId = chatId;
        this.firstname = firstname;
        this.midlename = midlename;
        this.surname = surname;
        this.university = university;
        this.title_group = title_group;
        this.username = username;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long chatId;
    private String username;
    private String firstname;
    private String midlename;
    private String surname;
    private String university;
    private String title_group;





}
