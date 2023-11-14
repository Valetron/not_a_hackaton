package com.backend.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "student")
@Data
public class Student {

    public Student() {
    }

    ;

    public Student(Long chatId, String username, String firstname, String middlename, String surname,
                   String university, String titleGroup) {

        this.chatId = chatId;
        this.firstname = firstname;
        this.middlename = middlename;
        this.surname = surname;
        this.university = university;
        this.titleGroup = titleGroup;
        this.username = username;
    }

    @Id
    private Long chatId;
    private String username;
    private String firstname;
    private String middlename;
    private String surname;
    private String university;
    private String titleGroup;

}
